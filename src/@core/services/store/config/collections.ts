import { User } from './documents';

export type UsersCollection = {
  name: 'users';
  type: User;
};

export type StoreCollection = UsersCollection;
