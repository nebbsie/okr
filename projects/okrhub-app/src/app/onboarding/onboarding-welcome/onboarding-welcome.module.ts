import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingWelcomeRoutingModule } from './onboarding-welcome-routing.module';
import { OnboardingWelcomeComponent } from './onboarding-welcome.component';
import { TextModule } from '@ui/text';
import { InputModule } from '@ui/input';
import { DirectivesModule } from '@directives/directives.module';
import { ButtonModule } from '@ui/button';
import { PipesModule } from '@pipes/pipes.module';
import { OnboardingTemplateModule } from '../onboarding-template/onboarding-template.module';

@NgModule({
  declarations: [OnboardingWelcomeComponent],
  imports: [
    CommonModule,
    OnboardingWelcomeRoutingModule,
    TextModule,
    InputModule,
    DirectivesModule,
    ButtonModule,
    PipesModule,
    OnboardingTemplateModule,
  ],
})
export class OnboardingWelcomeModule {}
