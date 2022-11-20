import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { PageComponent } from '@ui/page';

@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, TeamRoutingModule, PageComponent],
})
export class TeamModule {}
