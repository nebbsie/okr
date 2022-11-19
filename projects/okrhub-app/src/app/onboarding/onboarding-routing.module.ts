import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('./onboarding-welcome/onboarding-welcome.module').then(
            (m) => m.OnboardingWelcomeModule
          ),
      },
      {
        path: 'usage',
        loadChildren: () =>
          import('./onboarding-usage/onboarding-usage.module').then(
            (m) => m.OnboardingUsageModule
          ),
      },
      {
        path: 'setup',
        loadChildren: () =>
          import('./onboarding-setup/onboarding-setup.module').then(
            (m) => m.OnboardingSetupModule
          ),
      },
      {
        path: '**',
        redirectTo: 'welcome',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
