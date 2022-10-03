import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { LoginResponse } from '@core/services/auth/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  /**
   * Gets the users Firebase information.
   */
  getAuthState(): Observable<User | undefined> {
    return authState(this.auth).pipe(
      map((auth) => (auth === null ? undefined : auth))
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

  /**
   * Logs the user in via an email and password to Firebase.
   *
   * @param email
   * @param password
   */
  loginWithEmail(email: string, password: string): Observable<LoginResponse> {
    // NOTE: I'm sure there is a nicer way to convert this from a Promise to Observable.
    // This will do for the moment however.
    return fromPromise(
      (async (): Promise<LoginResponse> => {
        try {
          await signInWithEmailAndPassword(this.auth, email, password);

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
    // This will do for the moment however.
    return fromPromise(
      (async (): Promise<LoginResponse> => {
        try {
          await signInWithPopup(this.auth, new GoogleAuthProvider());

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
}
