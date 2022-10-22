import { StoreDocument } from '../store.types';
import {
  EnterpriseRole,
  LogType,
  MinimalKeyResult,
  MinimalTeam,
} from './types';

export interface User extends StoreDocument {}

export interface Enterprise extends StoreDocument {
  readonly name: string;
  readonly creatorId: string;
  readonly teams: { [id: string]: MinimalTeam };
}
export interface EnterpriseMember extends StoreDocument {
  readonly userId: string;
  readonly role: EnterpriseRole;
}

export interface Board extends StoreDocument {}
export interface BoardMember extends StoreDocument {}

export interface Team extends StoreDocument {
  readonly enterpriseId: string;
  readonly name: string;
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

export interface Objective extends StoreDocument {
  readonly title: string;
  readonly keyResults: MinimalKeyResult[];
}

export interface KeyResult extends StoreDocument {
  readonly title: string;
}
