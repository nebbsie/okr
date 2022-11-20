import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingTemplateComponent } from './onboarding-template.component';
import { DirectivesModule } from '@directives/directives.module';
import { ButtonComponent } from '@ui/button';
import { TextComponent } from '@ui/text';

@NgModule({
  declarations: [OnboardingTemplateComponent],
  imports: [CommonModule, TextComponent, DirectivesModule, ButtonComponent],
  exports: [OnboardingTemplateComponent],
})
export class OnboardingTemplateModule {}
