import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { AuthService } from '@core/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-form',
  template: `
    <ui-text align="center" weight="bold" size="xxlarge" marginBottom="mid">
      okrhub
    </ui-text>

    <ui-alert
      *ngIf="(fromAction$ | oAsync) === 'password-reset'"
      type="success"
      marginBottom="mid"
    >
      Your password has been successfully reset.
    </ui-alert>

    <mat-form-field appearance="outline">
      <mat-label>Email</mat-label>
      <input [formControl]="emailControl" matInput />
      <mat-icon matSuffix>alternate_email</mat-icon>
    </mat-form-field>

    <app-password-input
      label="Password"
      [control]="passwordControl"
    ></app-password-input>

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

    <ui-link link="/recover/forgot" marginBottom="mid">
      Forgot password?
    </ui-link>

    <ui-divider-text marginBottom="small"> or sign in with </ui-divider-text>

    <app-google-auth-button
      [loading]="loadingGoogle$ | oAsync"
      (submit)="handleGoogleLogin()"
      marginBottom="mid"
    ></app-google-auth-button>

    <ui-link link="/register" align="center">Need an account?</ui-link>
  `,
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  @Output() successfullyLoggedIn = new EventEmitter<void>();

  emailControl = new FormControl();
  passwordControl = new FormControl();

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject$.asObservable();

  private googleLoadingSubject$ = new BehaviorSubject<boolean>(false);
  loadingGoogle$ = this.googleLoadingSubject$.asObservable();

  private errorSubject$ = new BehaviorSubject<boolean>(false);
  error$ = this.errorSubject$.asObservable();

  fromAction$!: Observable<string | undefined>;

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fromAction$ = this.route.queryParams.pipe(
      map((params) => params['from'])
    );
  }

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
