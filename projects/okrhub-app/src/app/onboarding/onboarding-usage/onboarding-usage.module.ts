import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingUsageRoutingModule } from './onboarding-usage-routing.module';
import { OnboardingUsageComponent } from './onboarding-usage.component';
import { TextModule } from '@ui/text';
import { DirectivesModule } from '@directives/directives.module';
import { OnboardingTemplateModule } from '../onboarding-template/onboarding-template.module';
import { FlexModule } from '@ui/flex';
import { IconModule } from '@ui/icon';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [OnboardingUsageComponent],
  imports: [
    CommonModule,
    OnboardingUsageRoutingModule,
    TextModule,
    DirectivesModule,
    OnboardingTemplateModule,
    FlexModule,
    IconModule,
    PipesModule,
  ],
})
export class OnboardingUsageModule {}
