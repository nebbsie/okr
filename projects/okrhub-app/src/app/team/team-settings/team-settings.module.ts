import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSettingsComponent } from './team-settings.component';
import { TeamSettingsRoutingModule } from './team-settings-routing.module';

@NgModule({
  declarations: [TeamSettingsComponent],
  imports: [CommonModule, TeamSettingsRoutingModule],
})
export class TeamSettingsModule {}
