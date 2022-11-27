import {
  FirebaseMapToTypescriptMap,
  transformStoreDocumentFields,
} from '@services/store';
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

function TransformUser(data: any): User {
  return {
    joinedBoards: FirebaseMapToTypescriptMap(data.joinedBoards),
    joinedWorkspaces: FirebaseMapToTypescriptMap(data.joinedWorkspaces),
    joinedTeams: FirebaseMapToTypescriptMap(data.joinedTeams),
    isSetup: data.isSetup,
    fullName: data.fullName,
    type: data.type,
    ...transformStoreDocumentFields(data),
  };
}

function TransformWorkspace(data: any): Workspace {
  return {
    name: data.name,
    creatorId: data.createdTime,
    teams: FirebaseMapToTypescriptMap(data.teams),
    ...transformStoreDocumentFields(data),
  };
}

function TransformWorkspaceMember(data: any): WorkspaceMember {
  return {
    workspaceId: data.workspaceId,
    userId: data.userId,
    role: data.role,
    ...transformStoreDocumentFields(data),
  };
}

function TransformTeam(data: any): Team {
  return {
    name: data.name,
    boards: FirebaseMapToTypescriptMap(data.boards),
    workspaceId: data.workspaceId,
    ...transformStoreDocumentFields(data),
  };
}

function TransformTeamMember(data: any): TeamMember {
  return {
    ...transformStoreDocumentFields(data),
  };
}

function TransformBoard(data: any): Board {
  return {
    teamId: data.teamId,
    name: data.name,
    ...transformStoreDocumentFields(data),
  };
}

function TransformBoardMember(data: any): BoardMember {
  return {
    ...transformStoreDocumentFields(data),
  };
}

function TransformLog(data: any): Log {
  return {
    userId: data.userId,
    type: data.type,
    extra: data.extra,
    ...transformStoreDocumentFields(data),
  };
}

function TransformEarlyAccess(data: any): EarlyAccess {
  return {
    email: data.email,
    ...transformStoreDocumentFields(data),
  };
}

function TransformObjective(data: any): Objective {
  return {
    title: data.title,
    boardId: data.boardId,
    keyResults: data.keyResults,
    desc: data.desc,
    position: data.position,
    ...transformStoreDocumentFields(data),
  };
}

function TransformKeyResult(data: any): KeyResult {
  return {
    title: data.title,
    ...transformStoreDocumentFields(data),
  };
}

export const TransformerMap = {
  users: TransformUser,
  workspaces: TransformWorkspace,
  workspaceMembers: TransformWorkspaceMember,
  boards: TransformBoard,
  boardMembers: TransformBoardMember,
  teams: TransformTeam,
  teamMembers: TransformTeamMember,
  logs: TransformLog,
  earlyAccess: TransformEarlyAccess,
  objectives: TransformObjective,
  keyResults: TransformKeyResult,
};
