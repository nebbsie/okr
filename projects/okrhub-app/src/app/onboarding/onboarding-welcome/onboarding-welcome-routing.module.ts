import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingWelcomeComponent } from './onboarding-welcome.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingWelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingWelcomeRoutingModule {}
