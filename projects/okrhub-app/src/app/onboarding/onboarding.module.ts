import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { PageModule } from '@ui/page';
import { TextModule } from '@ui/text';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  declarations: [OnboardingComponent],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    PageModule,
    TextModule,
    DirectivesModule,
  ],
})
export class OnboardingModule {}
