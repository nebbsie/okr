import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingWelcomeRoutingModule } from './onboarding-welcome-routing.module';
import { OnboardingWelcomeComponent } from './onboarding-welcome.component';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';
import { OnboardingTemplateModule } from '../onboarding-template/onboarding-template.module';
import { ButtonComponent } from '@ui/button';
import { InputComponent } from '@ui/input';
import { TextComponent } from '@ui/text';

@NgModule({
  declarations: [OnboardingWelcomeComponent],
  imports: [
    CommonModule,
    OnboardingWelcomeRoutingModule,
    TextComponent,
    DirectivesModule,
    ButtonComponent,
    PipesModule,
    OnboardingTemplateModule,
    InputComponent,
  ],
})
export class OnboardingWelcomeModule {}
