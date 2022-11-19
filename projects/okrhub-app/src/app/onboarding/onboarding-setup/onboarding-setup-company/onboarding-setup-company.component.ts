import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding-setup-company',
  template: `
    <p>
      onboarding-setup-company works!
    </p>
  `,
  styleUrls: ['./onboarding-setup-company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingSetupCompanyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
