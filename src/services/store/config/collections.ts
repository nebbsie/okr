import {
  Board,
  BoardMember,
  EarlyAccess,
  KeyResult,
  Log,
  Objective,
  Team,
  TeamMember,
  User,
  Workspace,
  WorkspaceMember,
} from './documents';

export type UsersCollection = {
  name: 'users';
  type: User;
};

export type WorkspacesCollection = {
  name: 'workspaces';
  type: Workspace;
};

export type WorkspaceMembersCollection = {
  name: 'workspaceMembers';
  type: WorkspaceMember;
};

export type TeamsCollection = {
  name: 'teams';
  type: Team;
};

export type TeamMembersCollection = {
  name: 'teamMembers';
  type: TeamMember;
};

export type BoardsCollection = {
  name: 'boards';
  type: Board;
};

export type BoardMembersCollection = {
  name: 'boardMembers';
  type: BoardMember;
};

export type LogsCollection = {
  name: 'logs';
  type: Log;
};

export type EarlyAccessCollection = {
  name: 'earlyAccess';
  type: EarlyAccess;
};

export type ObjectivesCollection = {
  name: 'objectives';
  type: Objective;
};

export type KeyResultCollection = {
  name: 'keyResults';
  type: KeyResult;
};

export type StoreCollection =
  | UsersCollection
  | WorkspacesCollection
  | WorkspaceMembersCollection
  | TeamsCollection
  | TeamMembersCollection
  | BoardsCollection
  | BoardMembersCollection
  | LogsCollection
  | EarlyAccessCollection
  | ObjectivesCollection
  | KeyResultCollection;
