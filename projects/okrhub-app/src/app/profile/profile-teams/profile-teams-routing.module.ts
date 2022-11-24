import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileTeamsComponent } from './profile-teams.component';

const routes: Routes = [{ path: '', component: ProfileTeamsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileTeamsRoutingModule {}
