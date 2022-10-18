import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@core/services/store';

@Component({
  selector: 'app-landing-blade',
  template: `
    <ui-text
      size="xxxlarge"
      sizeTablet="title"
      sizeDesktop="title"
      align="center"
      weight="bold"
      display="inline-block"
      transform="uppercase"
      marginBottom="large"
    >
      The Most Complete OKR Management Solution
    </ui-text>

    <ui-text
      size="large"
      sizeTablet="xlarge"
      display="inline-block"
      align="center"
      weight="medium"
      transform="uppercase"
      marginBottom="xxlarge"
      marginBottomTablet="xxxxlarge"
    >
      The perfect tool for teams or individuals.
    </ui-text>

    <ui-text
      size="large"
      sizeTablet="xlarge"
      display="inline-block"
      align="center"
      weight="medium"
      marginBottom="small"
    >
      Want early access? Sign up!
    </ui-text>
    <div class="EmailCollect">
      <ui-input
        class="EmailCollect-input"
        label="Enter your email address"
        submitAction="send"
        [control]="earlyAccessEmailControl"
        (submit)="handleSubmitEarlyAccess()"
      ></ui-input>
    </div>
  `,
  styleUrls: ['./landing-blade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingBladeComponent implements OnInit {
  earlyAccessEmailControl = new FormControl();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  handleSubmitEarlyAccess(): void {}
}
