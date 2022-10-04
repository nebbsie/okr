import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-forgot-password',
  template: `
    <ui-text align="center" weight="bold" size="xxlarge" marginBottom="mid">
      okrhub
    </ui-text>

    <mat-form-field appearance="outline">
      <mat-label>Email</mat-label>
      <input [formControl]="emailControl" matInput />
      <mat-icon matSuffix>alternate_email</mat-icon>
    </mat-form-field>

    <ui-button
      colour="primary"
      marginBottom="xsmall"
      [fullWidth]="true"
      [loading]="loading$ | oAsync"
      (click)="handleResetPassword()"
    >
      Reset Password
    </ui-button>

    <ui-link
      align="center"
      link="/login"
      [marginBottom]="(sentReset$ | oAsync) ? 'mid' : 'none'"
    >
      Back to Sign In
    </ui-link>

    <ui-alert *ngIf="sentReset$ | oAsync" type="success">
      Successfully reset password. Check your emails for instructions.
    </ui-alert>
  `,
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  emailControl = new FormControl();

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject$.asObservable();

  private sentResetSubject$ = new BehaviorSubject<boolean>(false);
  sentReset$ = this.sentResetSubject$.asObservable();

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  async handleResetPassword() {
    this.loadingSubject$.next(true);
    this.sentResetSubject$.next(false);

    await firstValueFrom(this.auth.resetPassword(this.emailControl.value));

    this.sentResetSubject$.next(true);
    this.loadingSubject$.next(false);
  }
}
