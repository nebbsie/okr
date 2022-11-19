import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './dashboard/dashboard.guard';
import { LoginGuard } from './login/login.guard';
import { RegisterGuard } from './register/register.guard';
import { OnboardingGuard } from './onboarding/onboarding.guard';
import { TeamGuard } from './team/team.guard';
import { ProfileGuard } from './profile/profile.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [DashboardGuard],
    data: {},
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'team/:id',
    canActivate: [TeamGuard],
    data: {},
    loadChildren: () => import('./team/team.module').then((m) => m.TeamModule),
  },
  {
    path: 'profile',
    canActivate: [ProfileGuard],
    data: {},
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    data: {
      noShell: true,
    },
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    canActivate: [RegisterGuard],
    data: {
      noShell: true,
    },
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'recover',
    data: {
      noShell: true,
    },
    loadChildren: () =>
      import('./recover/recover.module').then((m) => m.RecoverModule),
  },
  {
    path: 'onboarding',
    canActivate: [OnboardingGuard],
    data: {
      noShell: true,
    },
    loadChildren: () =>
      import('./onboarding/onboarding.module').then((m) => m.OnboardingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
