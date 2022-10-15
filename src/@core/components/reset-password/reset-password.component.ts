import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-reset-password',
  template: `
    <ui-text align="center" weight="bold" size="xlarge" marginBottom="mid">
      Create new password
    </ui-text>

    <ui-text align="center" size="mid" colour="grey" marginBottom="mid">
      Your new password must be different from previously used passwords.
    </ui-text>

    <ui-input
      label="Password"
      type="password"
      [control]="passwordControl"
    ></ui-input>

    <ui-input
      label="Confirm password"
      type="password"
      [control]="passwordConfirmControl"
    ></ui-input>

    <ui-text size="small" colour="grey" marginBottom="mid">
      Both passwords must match.
    </ui-text>

    <ui-button
      colour="primary"
      marginBottom="xsmall"
      [fullWidth]="true"
      [disabled]="invalidPasswords$ | Async"
      [loading]="loading$ | Async"
      (click)="handlePasswordChange()"
    >
      Reset Password
    </ui-button>

    <ui-link align="center" link="/recover/sent"> Back </ui-link>

    <ui-alert *ngIf="error$ | Async" type="error">
      There was an error resetting your password. Try again.
    </ui-alert>
  `,
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  passwordControl = new FormControl<string | null>(null);
  passwordConfirmControl = new FormControl<string | null>(null);

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject$.asObservable();

  private errorSubject$ = new BehaviorSubject<boolean>(false);
  error$ = this.errorSubject$.asObservable();

  invalidPasswords$!: Observable<boolean>;
  oobCode$!: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.oobCode$ = this.route.queryParams.pipe(
      map((params) => params['oobCode'])
    );

    this.invalidPasswords$ = combineLatest([
      this.passwordControl.valueChanges,
      this.passwordConfirmControl.valueChanges,
    ]).pipe(
      map(([password, confirmPassword]) => password !== confirmPassword),
      startWith(true)
    );
  }

  async handlePasswordChange() {
    if (this.passwordConfirmControl.value === null) {
      return;
    }

    this.errorSubject$.next(false);
    this.loadingSubject$.next(true);

    const oobCode = await firstValueFrom(this.oobCode$);

    const success = await firstValueFrom(
      this.auth.confirmPasswordReset(oobCode, this.passwordConfirmControl.value)
    );

    this.loadingSubject$.next(false);
    this.errorSubject$.next(!success);

    if (success) {
      await this.router.navigate(['/login'], {
        queryParams: { from: 'password-reset' },
      });
    }
  }
}
