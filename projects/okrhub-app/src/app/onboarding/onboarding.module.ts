import { NgModule } from '@angular/core';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { DirectivesModule } from '@directives/directives.module';
import { PageComponent } from '@ui/page';
import { TextComponent } from '@ui/text';

@NgModule({
  declarations: [OnboardingComponent],
  imports: [
    OnboardingRoutingModule,
    PageComponent,
    TextComponent,
    DirectivesModule,
  ],
})
export class OnboardingModule {}
