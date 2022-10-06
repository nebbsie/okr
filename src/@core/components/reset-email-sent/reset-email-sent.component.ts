import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-email-sent',
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
export class ResetEmailSentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
