import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';
import { LinkComponent } from '@ui/link';
import { ButtonComponent } from '@ui/button';
import { TextComponent } from '@ui/text';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    TextComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    ButtonComponent,
    DirectivesModule,
    PipesModule,
    LinkComponent,
  ],
  template: `
    <ui-text align="center" weight="bold" size="xlarge" marginBottom="mid">
      Forgot password?
    </ui-text>

    <ui-text align="center" size="mid" colour="grey" marginBottom="mid">
      No worries, we'll send you reset instructions.
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
      [disabled]="emailControl.value === null"
      [loading]="loading$ | Async"
      (click)="handleResetPassword()"
    >
      Reset Password
    </ui-button>

    <ui-link align="center" link="/login"> Back to Login </ui-link>
  `,
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  emailControl = new FormControl<string | null>(null);

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject$.asObservable();

  constructor(private auth: AuthService, private router: Router) {}

  async handleResetPassword() {
    if (this.emailControl.value === null) {
      return;
    }

    this.loadingSubject$.next(true);

    await firstValueFrom(
      this.auth.sendPasswordResetEmail(this.emailControl.value)
    );

    await this.router.navigate(['/recover/sent']);
  }
}
