import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingTemplateComponent } from './onboarding-template.component';
import { TextModule } from '@ui/text';
import { DirectivesModule } from '@directives/directives.module';
import { ButtonModule } from '@ui/button';

@NgModule({
  declarations: [OnboardingTemplateComponent],
  imports: [CommonModule, TextModule, DirectivesModule, ButtonModule],
  exports: [OnboardingTemplateComponent],
})
export class OnboardingTemplateModule {}
