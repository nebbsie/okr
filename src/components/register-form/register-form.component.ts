import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AuthService } from '../../services';
import { isEmail, isValidPassword } from '../../utils/validators';

@Component({
  selector: 'app-register-form',
  template: `
    <ui-text align="center" weight="bold" size="xxlarge" marginBottom="mid">
      okrhub
    </ui-text>

    <ui-input
      label="Email"
      type="email"
      icon="alternate_email"
      [control]="emailControl"
    ></ui-input>

    <ui-input
      label="Password"
      type="password"
      hint="Minimum 8 characters with 1 uppercase and 1 number."
      marginBottom="mid"
      [control]="passwordControl"
    ></ui-input>

    <ui-button
      colour="primary"
      marginBottom="mid"
      [fullWidth]="true"
      [loading]="loading$ | Async"
      (click)="handleSignup()"
    >
      Signup
    </ui-button>

    <ui-alert *ngIf="error$ | Async" marginBottom="small" type="error">
      Your username and/or password do not match.
    </ui-alert>

    <ui-divider-text marginBottom="mid"> or sign up with </ui-divider-text>

    <app-google-auth-button
      [loading]="loadingGoogle$ | Async"
      (submit)="handleGoogleSignup()"
      marginBottom="mid"
    >
      Sign up with Google
    </app-google-auth-button>

    <ui-link link="/login" align="center">Already have an account?</ui-link>
  `,
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Output() successfullySignedUp = new EventEmitter<void>();

  emailControl = new FormControl<string | undefined>(undefined, [
    isEmail('Provide a valid email address.'),
  ]);
  passwordControl = new FormControl<string | undefined>(undefined, [
    isValidPassword('Minimum 8 characters with 1 uppercase and 1 number.'),
  ]);

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject$.asObservable();

  private googleLoadingSubject$ = new BehaviorSubject<boolean>(false);
  loadingGoogle$ = this.googleLoadingSubject$.asObservable();

  private errorSubject$ = new BehaviorSubject<boolean>(false);
  error$ = this.errorSubject$.asObservable();

  constructor(private auth: AuthService) {}

  async handleSignup() {
    const email = this.emailControl.value;
    const password = this.passwordControl.value;
    const confirmPassword = this.passwordControl.value;

    if (!email || !password || !confirmPassword) {
      return;
    }

    this.loadingSubject$.next(true);

    const result = await firstValueFrom(
      this.auth.loginWithEmail(email, password)
    );

    this.loadingSubject$.next(false);

    if (!result.success) {
      this.errorSubject$.next(true);
      return;
    }

    this.successfullySignedUp.emit();
  }

  async handleGoogleSignup() {
    this.googleLoadingSubject$.next(true);

    const result = await firstValueFrom(this.auth.loginWithGoogle());

    this.googleLoadingSubject$.next(false);

    if (!result.success) {
      this.errorSubject$.next(true);
      return;
    }

    this.successfullySignedUp.emit();
  }
}
