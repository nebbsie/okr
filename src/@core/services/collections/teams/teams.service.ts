import { Injectable } from '@angular/core';
import {
  EnterprisesCollection,
  ErrorCode,
  getServiceLogicError,
  LogType,
  RequestResult,
  Store,
  TeamsCollection,
} from '@core/services/store';
import { firstValueFrom } from 'rxjs';
import { LogsService } from '@core/services/collections/logs/logs.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private store: Store, private logs: LogsService) {}

  /**
   * 1) Creates a `Team`
   * 2) Adds a `MinimalTeam` to the `Enterprise` that was given.
   */
  async createTeam(name: string, enterpriseId: string): Promise<RequestResult> {
    // Create a team.
    const teamId = await firstValueFrom(
      this.store.create('teams', {
        name,
        enterpriseId: enterpriseId,
      }).result$
    );
    if (!teamId) {
      return getServiceLogicError(
        'Unable to create team.',
        ErrorCode.CREATE_FAILED
      );
    }

    // Get the enterprise that the team will be added to.
    const enterpriseToAddTo = await firstValueFrom(
      this.store.get<EnterprisesCollection>('enterprises', enterpriseId).result$
    );
    if (!enterpriseToAddTo) {
      return getServiceLogicError(
        'No enterprise was found to add the team to.',
        ErrorCode.ENTERPRISE_NOT_FOUND
      );
    }

    // Update the teams array on the enterprise.
    await firstValueFrom(
      this.store.update('enterprises', enterpriseId, {
        teams: { ...enterpriseToAddTo.teams, [teamId]: { name, id: teamId } },
      }).result$
    );

    return {
      status: 'success',
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
      this.store.get<TeamsCollection>('teams', teamId).result$
    );
    if (!teamToDelete) {
      return getServiceLogicError(
        'Team was not found to delete.',
        ErrorCode.TEAM_NOT_FOUND
      );
    }

    // Get the `Enterprise` that the `Team` is part of.
    const enterprise = await firstValueFrom(
      this.store.get<EnterprisesCollection>(
        'enterprises',
        teamToDelete.enterpriseId
      ).result$
    );
    if (!enterprise) {
      return getServiceLogicError(
        'Failed to find enterprise that the team was attached to.',
        ErrorCode.ENTERPRISE_NOT_FOUND
      );
    }

    // Deletes the `team`.
    await firstValueFrom(
      this.store.delete<TeamsCollection>('teams', teamId).result$
    );

    // Delete the `MinimalTeam` from the `Enterprise`.
    const newTeams = enterprise.teams;
    delete newTeams[teamId];
    await firstValueFrom(
      this.store.update<EnterprisesCollection>('enterprises', enterprise.id, {
        teams: newTeams,
      }).result$
    );

    // Log the event.
    await this.logs.logEvent(LogType.TEAM_DELETE, teamToDelete);

    return { status: 'success' };
  }
}
