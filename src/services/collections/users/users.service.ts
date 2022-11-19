import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth';
import {
  GetResult,
  SetData,
  Store,
  UpdateData,
  UpdateResult,
  UsersCollection,
} from '@services/store';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private auth: AuthService, private store: Store) {}

  getCurrentUser(): GetResult<UsersCollection> {
    return this.store.get<UsersCollection>(
      'users',
      this.auth.getUserIdPotentiallyUndefined()
    );
  }

  listenCurrentUser(): GetResult<UsersCollection> {
    return this.store.listen<UsersCollection>(
      'users',
      this.auth.getUserIdPotentiallyUndefined()
    );
  }

  createUser(data: SetData<UsersCollection>) {
    return this.store.set<UsersCollection>('users', data);
  }

  updateCurrentUser(
    data: UpdateData<UsersCollection>
  ): UpdateResult<UsersCollection> {
    return this.store.update<UsersCollection>(
      'users',
      this.auth.getUserId(),
      data
    );
  }
}
