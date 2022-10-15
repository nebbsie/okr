import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  confirmPasswordReset,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import {
  filter,
  firstValueFrom,
  from,
  map,
  Observable,
  shareReplay,
} from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { LoginResponse } from '@core/services/auth/auth.types';
import { isDefined } from '@core/utils';
import { UsersService } from '@core/services/collections/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private users: UsersService) {}

  sendPasswordResetEmail(email: string): Observable<boolean> {
    return fromPromise(
      sendPasswordResetEmail(this.auth, email, {
        url: 'http://localhost:4200/recover/reset',
        handleCodeInApp: true,
      })
        .then((res) => {
          return true;
        })
        .catch((err) => {
          return false;
        })
    );
  }

  confirmPasswordReset(
    oobCode: string,
    newPassword: string
  ): Observable<boolean> {
    return fromPromise(
      confirmPasswordReset(this.auth, oobCode, newPassword)
        .then((res) => true)
        .catch((err) => false)
    );
  }

  /**
   * Gets the users Firebase information.
   */
  getAuthState(): Observable<User | undefined> {
    return authState(this.auth).pipe(
      map((auth) => (auth === null ? undefined : auth)),
      shareReplay()
    );
  }

  /**
   * Logs the user out  of Firebase auth.
   */
  logout(): Observable<void> {
    return from(this.auth.signOut());
  }

  /**
   * Returns if boolean state for if the user is authenticated with Firebase.
   */
  isLoggedIn(): Observable<boolean> {
    return this.getAuthState().pipe(map((auth) => !!auth));
  }

  getUserId(): Observable<string> {
    return this.getAuthState().pipe(
      map((auth) => auth?.uid),
      filter(isDefined)
    );
  }

  /**
   * Logs the user in via an email and password to Firebase.
   */
  loginWithEmail(email: string, password: string): Observable<LoginResponse> {
    // NOTE: I'm sure there is a nicer way to convert this from a Promise to Observable.
    // This will do for the moment, however.
    return fromPromise(
      (async (): Promise<LoginResponse> => {
        try {
          await signInWithEmailAndPassword(this.auth, email, password);

          await this.checkForUser();

          return {
            success: true,
          };
        } catch (err: any) {
          return {
            success: false,
            errorCode: err.code,
          };
        }
      })()
    );
  }

  /**
   * Logs the user into Firebase auth via the Google apis.
   */
  loginWithGoogle(): Observable<LoginResponse> {
    // NOTE: I'm sure there is a nicer way to convert this from a Promise to Observable.
    // This will do for the moment.
    return fromPromise(
      (async (): Promise<LoginResponse> => {
        try {
          await signInWithPopup(this.auth, new GoogleAuthProvider());

          await this.checkForUser();

          return {
            success: true,
          };
        } catch (err: any) {
          return {
            success: false,
            errorCode: err.code,
          };
        }
      })()
    );
  }

  async checkForUser() {
    const user = await firstValueFrom(
      this.users.getById(this.getUserId()).result$
    );

    const usersId = await firstValueFrom(this.getUserId());

    // If the user doesn't have a user we need to make one.
    if (!user) {
      console.info('Creating user');
      await firstValueFrom(this.users.set({ id: usersId }).result$);
    }
  }
}
