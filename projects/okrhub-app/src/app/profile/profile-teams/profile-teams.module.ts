import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileTeamsRoutingModule } from './profile-teams-routing.module';
import { ProfileTeamsComponent } from './profile-teams.component';
import { PageComponent } from '@ui/page';

@NgModule({
  declarations: [ProfileTeamsComponent],
  imports: [CommonModule, ProfileTeamsRoutingModule, PageComponent],
})
export class ProfileTeamsModule {}
