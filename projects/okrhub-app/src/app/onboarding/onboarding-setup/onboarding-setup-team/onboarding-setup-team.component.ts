import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding-setup-team',
  template: `
    <p>
      onboarding-setup-team works!
    </p>
  `,
  styleUrls: ['./onboarding-setup-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingSetupTeamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
