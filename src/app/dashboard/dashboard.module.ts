import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ButtonModule, PageModule, TextModule } from '@core/ui';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DirectivesModule } from '@core/directives';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
<<<<<<< HEAD
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from '@core/pipes';
<<<<<<< HEAD
import { TopBarModule } from '@core/components/top-bar';
=======
=======
import { DragDropModule } from '@angular/cdk/drag-drop';
>>>>>>> 0d75837 (Changed main cards functionality)
>>>>>>> 41c65f0 (rebased from nebbsie version)

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    PageModule,
    TextModule,
    MatIconModule,
    MatSidenavModule,
    DirectivesModule,
    MatTableModule,
    MatProgressBarModule,
<<<<<<< HEAD
    MatButtonModule,
    PipesModule,
<<<<<<< HEAD
    TopBarModule,
=======
=======
    DragDropModule,
>>>>>>> 0d75837 (Changed main cards functionality)
>>>>>>> 41c65f0 (rebased from nebbsie version)
  ],
})
export class DashboardModule {}
