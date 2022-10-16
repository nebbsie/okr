import { EnterpriseUser, User } from './documents';

export type UsersCollection = {
  name: 'users';
  type: User;
};

export type EnterprisesCollection = {
  name: 'enterprises';
  type: User;
};

export type EnterpriseUsersCollection = {
  name: 'enterpriseUsers';
  type: EnterpriseUser;
};

export type StoreCollection =
  | UsersCollection
  | EnterprisesCollection
  | EnterpriseUsersCollection;
