import { transformStoreDocumentFields } from '../store.helpers';
import {
  Board,
  BoardMember,
  EarlyAccess,
  Enterprise,
  EnterpriseMember,
  KeyResult,
  Log,
  Objective,
  Team,
  TeamMember,
  User,
} from './documents';

function TransformUser(data: {}): User {
  return {
    ...transformStoreDocumentFields(data),
  };
}

function TransformEnterprise(data: any): Enterprise {
  return {
    name: data.name,
    creatorId: data.createdTime,
    teams: data.teams,
    ...transformStoreDocumentFields(data),
  };
}

function TransformEnterpriseMember(data: any): EnterpriseMember {
  return {
    userId: data.userId,
    role: data.role,
    ...transformStoreDocumentFields(data),
  };
}

function TransformTeam(data: any): Team {
  return {
    name: data.name,
    enterpriseId: data.enterpriseId,
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
    keyResults: data.keyResults,
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
  enterprises: TransformEnterprise,
  enterpriseMembers: TransformEnterpriseMember,
  boards: TransformBoard,
  boardMembers: TransformBoardMember,
  teams: TransformTeam,
  teamMembers: TransformTeamMember,
  logs: TransformLog,
  earlyAccess: TransformEarlyAccess,
  objectives: TransformObjective,
  keyResults: TransformKeyResult,
};
