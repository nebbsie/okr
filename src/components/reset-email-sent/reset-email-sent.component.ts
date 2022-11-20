import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextModule } from '@ui/text';
import { ButtonModule } from '@ui/button';
import { DirectivesModule } from '@directives/directives.module';
import { RouterLink } from '@angular/router';
import { LinkModule } from '@ui/link';

@Component({
  selector: 'app-reset-email-sent',
  standalone: true,
  imports: [TextModule, ButtonModule, DirectivesModule, RouterLink, LinkModule],
  template: `
    <ui-text align="center" weight="bold" size="xlarge" marginBottom="mid">
      Check your email
    </ui-text>

    <ui-text align="center" size="mid" colour="grey" marginBottom="mid">
      We have sent instructions for how to reset your password to your email.
    </ui-text>

    <ui-button
      colour="primary"
      marginBottom="small"
      routerLink="/login"
      [fullWidth]="true"
    >
      Login
    </ui-button>

    <ui-link align="center" link="/recover/forgot">
      Didn't receive the link?
    </ui-link>
  `,
  styleUrls: ['./reset-email-sent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetEmailSentComponent {}
