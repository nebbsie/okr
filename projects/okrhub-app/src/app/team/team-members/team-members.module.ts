import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMembersComponent } from './team-members.component';
import { TeamMembersRoutingModule } from './team-members-routing.module';

@NgModule({
  declarations: [TeamMembersComponent],
  imports: [CommonModule, TeamMembersRoutingModule],
})
export class TeamMembersModule {}
