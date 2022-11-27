import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';

const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./team-dashboard/team-dashboard.module').then(
            (m) => m.TeamDashboardModule
          ),
      },
      {
        path: 'members',
        loadChildren: () =>
          import('./team-members/team-members.module').then(
            (m) => m.TeamMembersModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./team-settings/team-settings.module').then(
            (m) => m.TeamSettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
