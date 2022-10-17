import { transformStoreDocumentFields } from '../store.helpers';
import {
  Board,
  BoardMember,
  Enterprise,
  EnterpriseMember,
  Log,
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

export const TransformerMap = {
  users: TransformUser,
  enterprises: TransformEnterprise,
  enterpriseMembers: TransformEnterpriseMember,
  boards: TransformBoard,
  boardMembers: TransformBoardMember,
  teams: TransformTeam,
  teamMembers: TransformTeamMember,
  logs: TransformLog,
};
