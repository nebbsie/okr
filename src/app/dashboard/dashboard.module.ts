import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ButtonModule, PageModule, TextModule } from '@core/ui';
import { PipesModule } from '@core/pipes';
import { DirectivesModule } from '@core/directives';
import { MobileTopBarModule } from '@core/components/mobile-top-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    PageModule,
    TextModule,
    PipesModule,
    DirectivesModule,
    MobileTopBarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class DashboardModule {}
