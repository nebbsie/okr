import { Injectable } from '@angular/core';
import {
  ErrorCode,
  getServiceLogicError,
  LogType,
  MinimalObject,
  RequestResult,
  Store,
  Team,
  TeamsCollection,
  WorkspacesCollection,
} from '../../store';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { LogsService } from '../logs/logs.service';
import { AuthService } from '@services/auth';
import { UsersService } from '@services/collections/users';
import { where } from '@angular/fire/firestore';
import { isDefined } from '@utils/utils';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(
    private store: Store,
    private logs: LogsService,
    private auth: AuthService,
    private users: UsersService
  ) {}

  /**
   * 1) Creates a `Team`
   * 2) Adds a `MinimalTeam` to the `Workspace` that was given.
   */
  async createTeam(name: string, workspaceId: string): Promise<RequestResult> {
    // Create a team.
    const teamId = await firstValueFrom(
      this.store.create<TeamsCollection>('teams', {
        name,
        workspaceId: workspaceId,
        boards: new Map<string, MinimalObject>(),
      }).value$
    );
    if (!teamId) {
      return getServiceLogicError(
        'Unable to create team.',
        ErrorCode.CREATE_FAILED
      );
    }

    console.log(workspaceId);

    // Get the enterprise that the team will be added to.
    const workspaceToAddTo = await firstValueFrom(
      this.store.get<WorkspacesCollection>('workspaces', workspaceId).value$
    );
    if (!workspaceToAddTo) {
      return getServiceLogicError(
        'No workspace was found to add the team to.',
        ErrorCode.WORKSPACE_NOT_FOUND
      );
    }

    // Update the teams array on the enterprise.
    workspaceToAddTo.teams.set(teamId, { name, id: teamId });
    await firstValueFrom(
      this.store.update<WorkspacesCollection>('workspaces', workspaceId, {
        teams: workspaceToAddTo.teams,
      }).value$
    );

    const currentUser = await firstValueFrom(
      this.users.getCurrentUser().value$
    );
    if (!currentUser) {
      return getServiceLogicError(
        'Failed to get logged in user',
        ErrorCode.USER_NOT_FOUND
      );
    }

    // Add the joined team to the user collection.
    currentUser.joinedTeams.set(teamId, { name, id: teamId });
    await firstValueFrom(
      this.users.updateCurrentUser({ joinedTeams: currentUser.joinedTeams })
        .value$
    );

    return {
      status: 'success',
      id: teamId,
    };
  }

  /**
   * 1) Get the `Team` to delete.
   * 2) Get the `Enterprise` that the `Team` is associated with.
   * 3) Delete the `Team`.
   * 4) Delete the `MinimalTeam` from the `Enterpris`e.
   */
  async deleteTeam(teamId: string): Promise<RequestResult> {
    // Get the `Team` to delete.
    const teamToDelete = await firstValueFrom(
      this.store.get<TeamsCollection>('teams', teamId).value$
    );
    if (!teamToDelete) {
      return getServiceLogicError(
        'Team was not found to delete.',
        ErrorCode.TEAM_NOT_FOUND
      );
    }

    // Get the `Enterprise` that the `Team` is part of.
    const workspace = await firstValueFrom(
      this.store.get<WorkspacesCollection>(
        'workspaces',
        teamToDelete.workspaceId
      ).value$
    );
    if (!workspace) {
      return getServiceLogicError(
        'Failed to find workspace that the team was attached to.',
        ErrorCode.WORKSPACE_NOT_FOUND
      );
    }

    // Deletes the `team`.
    await firstValueFrom(
      this.store.delete<TeamsCollection>('teams', teamId).value$
    );

    // Delete the `MinimalTeam` from the `Enterprise`.
    const newTeams = workspace.teams;
    newTeams.delete(teamId);
    await firstValueFrom(
      this.store.update<WorkspacesCollection>('workspaces', workspace.id, {
        teams: newTeams,
      }).value$
    );

    // Log the event.
    await this.logs.logEvent(LogType.TEAM_DELETE, teamToDelete);

    return { status: 'success', id: teamId };
  }

  getCurrentUsersTeams() {
    const joinedTeamIds$ = this.users.listenCurrentUser().value$.pipe(
      filter(isDefined),
      map((user) => user.joinedTeams.keys()),
      distinctUntilChanged()
    );

    return joinedTeamIds$.pipe(
      switchMap((teamIds) => {
        const ids = Array.from(teamIds);
        const pages = Math.ceil(ids.length / 10);
        const responses: Observable<Team[] | undefined>[] = [];
        for (let i = 0; i < pages; i++) {
          const slice = ids.slice(i * 10, i * 10 + 10);
          responses.push(
            this.store.where<TeamsCollection>('teams', [
              where('id', 'in', slice),
            ]).value$
          );
        }
        return combineLatest(responses).pipe(
          map((res) => res.filter(isDefined).flat(1))
        );
      })
    );
  }
}
