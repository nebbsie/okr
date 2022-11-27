import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamSettingsComponent } from './team-settings.component';

const routes: Routes = [
  {
    path: '',
    component: TeamSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamSettingsRoutingModule {}
