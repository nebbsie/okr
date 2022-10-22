// Generic
export type MinimalObject = {
  readonly id: string;
  readonly name: string;
};

// Users
export type MinimalUser = MinimalObject;

// Enterprises
export type MinimalEnterprise = MinimalObject;

export enum EnterpriseRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

// Teams
export type MinimalTeam = MinimalObject;

// Boards
export type MinimalBoard = MinimalObject;

// Objectives
export type MinimalObjective = MinimalObject;

// Key Result
export type MinimalKeyResult = MinimalObject;

// Logs
export enum LogType {
  TEAM_DELETE = 'team_delete',
}
