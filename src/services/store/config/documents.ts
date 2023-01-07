import { StoreDocument } from '../store.types';
import {
  LogType,
  MinimalBoard,
  MinimalKeyResult,
  MinimalTeam,
  MinimalWorkspace,
  UserType,
  WorkspaceMemberRole,
} from './types';

export interface User extends StoreDocument {
  readonly joinedTeams: Map<string, MinimalTeam>;
  readonly joinedWorkspaces: Map<string, MinimalWorkspace>;
  readonly joinedBoards: Map<string, MinimalBoard>;

  readonly fullName: string;
  readonly type: UserType;
  readonly isSetup: boolean;
  readonly avatarUrl?: string;
}

export interface Workspace extends StoreDocument {
  readonly name: string;
  readonly creatorId: string;
  readonly teams: Map<string, MinimalTeam>;
}
export interface WorkspaceMember extends StoreDocument {
  readonly userId: string;
  readonly workspaceId: string;
  readonly role: WorkspaceMemberRole;
}

export interface Board extends StoreDocument {
  readonly name: string;
  readonly teamId: string;
}
export interface BoardMember extends StoreDocument {}

export interface Team extends StoreDocument {
  readonly workspaceId: string;
  readonly name: string;
  readonly boards: Map<string, MinimalBoard>;
}
export interface TeamMember extends StoreDocument {}

export interface Log extends StoreDocument {
  readonly type: LogType;
  readonly userId: string;
  readonly extra: any;
}

export interface EarlyAccess extends StoreDocument {
  readonly email: string;
}

export interface Objective extends PositionableObject {
  readonly title: string;
  readonly boardId: string;
  readonly desc?: string;
  readonly keyResults: MinimalKeyResult[];
}

export interface KeyResult extends StoreDocument {
  readonly title: string;
  readonly objectiveId: string;
}

export interface PositionableObject extends StoreDocument {
  readonly position: number;
}
