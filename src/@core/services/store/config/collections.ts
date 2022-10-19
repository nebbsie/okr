import {
  Board,
  BoardMember,
  EarlyAccess,
  Enterprise,
  EnterpriseMember,
  Log,
  Team,
  TeamMember,
  User,
} from './documents';

export type UsersCollection = {
  name: 'users';
  type: User;
};

export type EnterprisesCollection = {
  name: 'enterprises';
  type: Enterprise;
};

export type EnterpriseUsersCollection = {
  name: 'enterpriseMembers';
  type: EnterpriseMember;
};

export type TeamsCollection = {
  name: 'teams';
  type: Team;
};

export type TeamUsersCollection = {
  name: 'teamMembers';
  type: TeamMember;
};

export type BoardsCollection = {
  name: 'boards';
  type: Board;
};

export type BoardUsersCollection = {
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

export type StoreCollection =
  | UsersCollection
  | EnterprisesCollection
  | EnterpriseUsersCollection
  | TeamsCollection
  | TeamUsersCollection
  | BoardsCollection
  | BoardUsersCollection
  | LogsCollection
  | EarlyAccessCollection;
