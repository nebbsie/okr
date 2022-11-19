import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingSetupPersonalComponent } from './onboarding-setup-personal/onboarding-setup-personal.component';
import { OnboardingSetupTeamComponent } from './onboarding-setup-team/onboarding-setup-team.component';
import { OnboardingSetupCompanyComponent } from './onboarding-setup-company/onboarding-setup-company.component';

const routes: Routes = [
  {
    path: 'personal',
    component: OnboardingSetupPersonalComponent,
  },
  {
    path: 'team',
    component: OnboardingSetupTeamComponent,
  },
  {
    path: 'company',
    component: OnboardingSetupCompanyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingSetupRoutingModule {}
