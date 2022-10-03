import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-login-form',
  template: `
    <mat-card class="LoginForm">
      <mat-card-title class="LoginForm-title">Login</mat-card-title>
      <mat-card-content class="LoginForm-content">
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input [formControl]="emailControl" matInput />
          <mat-icon matSuffix>alternate_email</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input
            [type]="hidePassword ? 'password' : 'text'"
            [formControl]="passwordControl"
            matInput
          />
          <button
            mat-icon-button
            matSuffix
            (click)="hidePassword = !hidePassword"
            [attr.aria-label]="'Hide password'"
            [attr.aria-pressed]="hidePassword"
          >
            <mat-icon>
              {{ hidePassword ? 'visibility_off' : 'visibility' }}
            </mat-icon>
          </button>
        </mat-form-field>

        <ui-button
          colour="primary"
          marginBottom="xsmall"
          [fullWidth]="true"
          [loading]="loading$ | oAsync"
          (click)="handleLogin()"
        >
          Login
        </ui-button>

        <ui-alert *ngIf="error$ | oAsync" marginBottom="small" type="error">
          Your username and/or password do not match.
        </ui-alert>

        <ui-link link="password-reset" marginBottom="mid">
          Forgot password?
        </ui-link>

        <ui-divider-text marginBottom="small">
          or sign in with
        </ui-divider-text>

        <app-google-auth-button
          [loading]="loadingGoogle$ | oAsync"
          (submit)="handleGoogleLogin()"
          marginBottom="mid"
        ></app-google-auth-button>

        <ui-link link="/register" align="center">Need an account?</ui-link>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() successfullyLoggedIn = new EventEmitter<void>();

  hidePassword = true;
  emailControl = new FormControl();
  passwordControl = new FormControl();

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject$.asObservable();

  private googleLoadingSubject$ = new BehaviorSubject<boolean>(false);
  loadingGoogle$ = this.googleLoadingSubject$.asObservable();

  private errorSubject$ = new BehaviorSubject<boolean>(false);
  error$ = this.errorSubject$.asObservable();

  constructor(private auth: AuthService) {}

  async handleLogin() {
    this.loadingSubject$.next(true);

    const email = this.emailControl.value;
    const password = this.passwordControl.value;

    const result = await firstValueFrom(
      this.auth.loginWithEmail(email, password)
    );

    this.loadingSubject$.next(false);

    if (!result.success) {
      this.errorSubject$.next(true);
      return;
    }

    this.successfullyLoggedIn.emit();
  }

  async handleGoogleLogin() {
    this.googleLoadingSubject$.next(true);

    const result = await firstValueFrom(this.auth.loginWithGoogle());

    this.googleLoadingSubject$.next(false);

    if (!result.success) {
      this.errorSubject$.next(true);
      return;
    }

    this.successfullyLoggedIn.emit();
  }
}
