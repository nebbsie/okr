import { ChangeDetectionStrategy, Component } from '@angular/core';

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
  `,
  styleUrls: ['./landing-blade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingBladeComponent {}
