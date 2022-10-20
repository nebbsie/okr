import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ButtonModule, PageModule, TextModule } from '@core/ui';
import { PipesModule } from '@core/pipes';
import { DirectivesModule } from '@core/directives';
import { TopBarModule } from '@core/components/top-bar';

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
    TopBarModule,
  ],
})
export class DashboardModule {}
