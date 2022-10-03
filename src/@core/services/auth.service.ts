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
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginResponse } from '@core/services/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private snackBar: MatSnackBar) {}

  getAuthState(): Observable<User | undefined> {
    return authState(this.auth).pipe(
      map((auth) => (auth === null ? undefined : auth))
    );
  }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }

  isLoggedIn(): Observable<boolean> {
    return this.getAuthState().pipe(map((auth) => !!auth));
  }

  private async _loginWithEmail(
    email: string,
    password: string
  ): Promise<LoginResponse> {
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
  }

  loginWithEmail(email: string, password: string): Observable<LoginResponse> {
    return fromPromise(this._loginWithEmail(email, password));
  }

  private async _loginWithGoogle(): Promise<LoginResponse> {
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
  }

  loginWithGoogle(): Observable<LoginResponse> {
    return fromPromise(this._loginWithGoogle());
  }
}
