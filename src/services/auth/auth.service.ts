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
import { LoginResponse } from './auth.types';
import { isDefined } from '@utils/utils';
import { environment } from '@env/environment';
import { Store } from '../store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private store: Store) {}

  sendPasswordResetEmail(email: string): Observable<boolean> {
    return fromPromise(
      sendPasswordResetEmail(this.auth, email, {
        url: `${environment.http.baseUrl}/recover/reset`,
        handleCodeInApp: true,
      })
        .then(() => {
          return true;
        })
        .catch((err) => {
          console.error(err);
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
        .then(() => true)
        .catch((err) => {
          console.error(err);
          return false;
        })
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

  getUserIdPotentiallyUndefined(): Observable<string | undefined> {
    return this.getAuthState().pipe(map((auth) => auth?.uid));
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

          return {
            success: true,
          };
        } catch (err: any) {
          console.error(err);
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

          return {
            success: true,
          };
        } catch (err: any) {
          console.error(err);
          return {
            success: false,
            errorCode: err.code,
          };
        }
      })()
    );
  }

  checkForUser(): Observable<boolean> {
    return fromPromise(
      firstValueFrom(this.store.get('users', this.getUserId()).value$).then(
        (user) => !!user
      )
    );
  }
}
