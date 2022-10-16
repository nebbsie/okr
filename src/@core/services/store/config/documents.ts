import { StoreDocument } from '../store.types';
import { EnterpriseRole } from './types';

export interface User extends StoreDocument {}

export interface Enterprise extends StoreDocument {
  readonly name: string;
  readonly creatorId: string;
}

export interface EnterpriseUser extends StoreDocument {
  readonly userId: string;
  readonly role: EnterpriseRole;
}
