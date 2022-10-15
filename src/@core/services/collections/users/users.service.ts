import { Injectable } from '@angular/core';
import {
  CollectionService,
  CreateData,
  CreateResult,
  DeleteResult,
  DocumentId,
  GetResult,
  SetData,
  SetResult,
  StoreService,
  UpdateData,
  UpdateResult,
  WhereConstraints,
  WhereResult,
} from '@core/services/store';
import { User, USERS_COLLECTION } from './users.types';
import { UsersConverter } from './users.converter';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements CollectionService<User> {
  constructor(private store: StoreService) {}

  create(request: CreateData<User>): CreateResult {
    return this.store.create(USERS_COLLECTION, request);
  }

  delete(id: DocumentId): DeleteResult {
    return this.store.delete(USERS_COLLECTION, id);
  }

  getById(id: DocumentId): GetResult<User> {
    return this.store.get(USERS_COLLECTION, id, UsersConverter());
  }

  getWhere(constraints: WhereConstraints): WhereResult<User> {
    return this.store.where(USERS_COLLECTION, constraints, UsersConverter());
  }

  set(request: SetData<User>): SetResult {
    return this.store.set(USERS_COLLECTION, request, UsersConverter());
  }

  update(id: DocumentId, request: UpdateData<User>): UpdateResult {
    return this.store.update(USERS_COLLECTION, id, request, UsersConverter());
  }
}
