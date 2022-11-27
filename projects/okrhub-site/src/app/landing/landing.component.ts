import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <ui-flex direction="column" justify="center">
      <app-landing-blade
        marginBottom="large"
        marginBottomTablet="xlarge"
      ></app-landing-blade>
      <app-landing-video
        marginBottom="large"
        marginBottomTablet="xxxlarge"
      ></app-landing-video>
    </ui-flex>
  `,
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
