import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';
import { ButtonComponent } from '@ui/button';
import { PageComponent } from '@ui/page';
import { TextComponent } from '@ui/text';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PageComponent,
    TextComponent,
    MatIconModule,
    MatSidenavModule,
    DirectivesModule,
    MatTableModule,
    MatProgressBarModule,
    MatButtonModule,
    PipesModule,
    DragDropModule,
    ButtonComponent,
  ],
})
export class DashboardModule {}
