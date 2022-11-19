// Generic
export type MinimalObject = {
  readonly id: string;
  readonly name: string;
};

// Users
export type MinimalUser = MinimalObject;

export enum UserType {
  UNSELECTED = 'unselected', // This is the default type.
  PERSONAL = 'personal',
  TEAM = 'team',
  COMPANY = 'company',
}

// Enterprises
export type MinimalWorkspace = MinimalObject;

export enum WorkspaceMemberRole {
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
