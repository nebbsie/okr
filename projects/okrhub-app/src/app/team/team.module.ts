import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { PageComponent } from '@ui/page';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    PageComponent,
    MatMenuModule,
    MatIconModule,
  ],
})
export class TeamModule {}
