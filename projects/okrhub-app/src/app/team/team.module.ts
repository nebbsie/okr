import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { PageModule } from '@ui/page';

@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, TeamRoutingModule, PageModule],
})
export class TeamModule {}
