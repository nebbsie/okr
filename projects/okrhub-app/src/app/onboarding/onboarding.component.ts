import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  template: `
    <ui-page [center]="true">
      <ui-text
        align="center"
        weight="bold"
        size="xxlarge"
        marginBottom="xxlarge"
      >
        okrhub
      </ui-text>

      <div class="OnboardingStep">
        <router-outlet></router-outlet>
      </div>
    </ui-page>
  `,
  styleUrls: ['./onboarding.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
