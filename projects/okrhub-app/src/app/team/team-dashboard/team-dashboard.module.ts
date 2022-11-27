import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDashboardComponent } from './team-dashboard.component';
import { TeamDashboardRoutingModule } from './team-dashboard-routing.module';

@NgModule({
  declarations: [TeamDashboardComponent],
  imports: [CommonModule, TeamDashboardRoutingModule],
})
export class TeamDashboardModule {}
