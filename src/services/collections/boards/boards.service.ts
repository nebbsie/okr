import { Injectable } from '@angular/core';
import {
  BoardsCollection,
  ErrorCode,
  getServiceLogicError,
  RequestResult,
  Store,
  TeamsCollection,
} from '@services/store';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private store: Store) {}

  async createBoard(boardName: string, teamId: string): Promise<RequestResult> {
    // Get the team to add the board to.
    const team = await firstValueFrom(
      this.store.get<TeamsCollection>('teams', teamId).value$
    );
    if (!team) {
      return getServiceLogicError(
        'Unable to get the team to add the board to.',
        ErrorCode.BOARD_NOT_FOUND
      );
    }

    // Create the board.
    const boardId = await firstValueFrom(
      this.store.create<BoardsCollection>('boards', { name: boardName, teamId })
        .value$
    );
    if (!boardId) {
      return getServiceLogicError(
        'Unable to create board.',
        ErrorCode.CREATE_FAILED
      );
    }

    // Set the board on the team.
    team.boards.set(boardId, { id: boardId, name: boardName });
    await firstValueFrom(
      this.store.update<TeamsCollection>('teams', team.id, {
        boards: team.boards,
      }).value$
    );

    return {
      status: 'success',
      id: boardId,
    };
  }
}
