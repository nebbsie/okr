import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingUsageComponent } from './onboarding-usage.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingUsageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingUsageRoutingModule {}
