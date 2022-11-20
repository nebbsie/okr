import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingUsageRoutingModule } from './onboarding-usage-routing.module';
import { OnboardingUsageComponent } from './onboarding-usage.component';
import { DirectivesModule } from '@directives/directives.module';
import { OnboardingTemplateModule } from '../onboarding-template/onboarding-template.module';
import { FlexComponent } from '@ui/flex';
import { IconComponent } from '@ui/icon';
import { PipesModule } from '@pipes/pipes.module';
import { TextComponent } from '@ui/text';

@NgModule({
  declarations: [OnboardingUsageComponent],
  imports: [
    CommonModule,
    OnboardingUsageRoutingModule,
    TextComponent,
    DirectivesModule,
    OnboardingTemplateModule,
    PipesModule,
    FlexComponent,
    IconComponent,
  ],
})
export class OnboardingUsageModule {}
