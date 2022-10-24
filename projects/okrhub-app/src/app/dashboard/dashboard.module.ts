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
import { ButtonModule } from '@ui/button';
import { PageModule } from '@ui/page';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';
import { TopBarModule } from '@components/top-bar';
import { KeyResultListModule } from '@components/key-result-list';
import { ObjectiveParentCardModule } from '@components/objective-parent-card';
import { ObjectiveCardListModule } from '@components/objective-card-list';
import { SidebarNavigationModule } from '@components/sidebar-navigation';
import { TextModule } from '@ui/text';

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
    MatButtonModule,
    PipesModule,
    DragDropModule,
    TopBarModule,
    KeyResultListModule,
    ObjectiveParentCardModule,
    ObjectiveCardListModule,
    SidebarNavigationModule,
  ],
})
export class DashboardModule {}
