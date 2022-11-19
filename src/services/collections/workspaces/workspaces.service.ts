import { Injectable } from '@angular/core';
import {
  ErrorCode,
  getServiceLogicError,
  MinimalTeam,
  RequestResult,
  Store,
  WorkspaceMemberRole,
  WorkspaceMembersCollection,
  WorkspacesCollection,
} from '../../store';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../index';
import { UsersService } from '@services/collections/users';

@Injectable({
  providedIn: 'root',
})
export class WorkspacesService {
  constructor(
    private auth: AuthService,
    private store: Store,
    private users: UsersService
  ) {}

  async createWorkspace(workspaceName: string): Promise<RequestResult> {
    const user = await firstValueFrom(this.users.getCurrentUser().value$);
    if (!user) {
      return getServiceLogicError(
        'Unable to get logged in user.',
        ErrorCode.USER_NOT_FOUND
      );
    }

    // Create the workspace.
    const workspaceId = await firstValueFrom(
      this.store.create<WorkspacesCollection>('workspaces', {
        creatorId: user.id,
        name: workspaceName,
        teams: new Map<string, MinimalTeam>(),
      }).value$
    );
    if (!workspaceId) {
      return getServiceLogicError(
        'Unable to create workspace.',
        ErrorCode.CREATE_FAILED
      );
    }

    // Add a member for the workspace.
    const workspaceMemberId = await firstValueFrom(
      this.store.create<WorkspaceMembersCollection>('workspaceMembers', {
        userId: user.id,
        role: WorkspaceMemberRole.OWNER,
        workspaceId,
      }).value$
    );
    if (!workspaceMemberId) {
      return getServiceLogicError(
        'Unable to create workspace member.',
        ErrorCode.CREATE_FAILED
      );
    }

    // Update the user collection to store the joined workspace.
    user.joinedWorkspaces.set(workspaceId, {
      id: workspaceId,
      name: workspaceName,
    });
    await firstValueFrom(
      this.users.updateCurrentUser({ joinedWorkspaces: user.joinedWorkspaces })
        .value$
    );

    return {
      status: 'success',
      id: workspaceId,
    };
  }
}
