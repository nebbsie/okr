import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalComponent } from '@services/modal';
import {
  CreateBoardModalInput,
  CreateBoardModalOutput,
} from '@components/modals/create-board-modal/create-board-modal.types';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BoardsService } from '@services/collections/boards';

@Component({
  selector: 'app-create-board-modal',
  template: `
    <ui-text marginBottom="small" weight="medium" size="large">
      Create a new board
    </ui-text>

    <ui-text marginBottom="mid">
      A board is where you add your objectives and key results.
    </ui-text>

    <ui-input
      [control]="nameControl"
      marginBottom="small"
      label="Board name"
    ></ui-input>

    <ui-flex justify="space-between" align="center">
      <ui-button
        type="stroked"
        [disabled]="loadingCreatingBoard$ | Async"
        (click)="closeModal(undefined)"
      >
        Cancel
      </ui-button>
      <ui-button
        colour="primary"
        [loading]="loadingCreatingBoard$ | Async"
        (click)="handleCreateBoard()"
      >
        Create
      </ui-button>
    </ui-flex>
  `,
  styleUrls: ['./create-board-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBoardModalComponent extends ModalComponent<
  CreateBoardModalInput,
  CreateBoardModalOutput
> {
  nameControl = new FormControl<string | null>(null);

  private loadingCreatingBoardSubject$ = new BehaviorSubject<boolean>(false);
  loadingCreatingBoard$ = this.loadingCreatingBoardSubject$.asObservable();

  constructor(private boards: BoardsService) {
    super();
  }

  async handleCreateBoard() {
    this.loadingCreatingBoardSubject$.next(true);

    const name = this.nameControl.value;
    if (!name) {
      // TODO: handle this.
      this.loadingCreatingBoardSubject$.next(false);
      return;
    }

    const teamCreateResult = await this.boards.createBoard(
      name,
      this.input.teamId
    );
    if (teamCreateResult.status === 'error') {
      // TODO: handle this.
      this.loadingCreatingBoardSubject$.next(false);
      return;
    }

    this.closeModal(teamCreateResult.id);
  }
}
