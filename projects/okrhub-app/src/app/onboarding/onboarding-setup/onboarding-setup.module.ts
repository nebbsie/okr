import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingSetupRoutingModule } from './onboarding-setup-routing.module';
import { OnboardingSetupPersonalComponent } from './onboarding-setup-personal/onboarding-setup-personal.component';
import { OnboardingSetupTeamComponent } from './onboarding-setup-team/onboarding-setup-team.component';
import { OnboardingSetupCompanyComponent } from './onboarding-setup-company/onboarding-setup-company.component';
import { OnboardingTemplateModule } from '../onboarding-template/onboarding-template.module';
import { InputModule } from '@ui/input';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [
    OnboardingSetupPersonalComponent,
    OnboardingSetupTeamComponent,
    OnboardingSetupCompanyComponent,
  ],
  imports: [
    CommonModule,
    OnboardingSetupRoutingModule,
    OnboardingTemplateModule,
    InputModule,
    PipesModule,
  ],
})
export class OnboardingSetupModule {}
