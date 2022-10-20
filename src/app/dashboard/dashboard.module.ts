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
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from '@core/pipes';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KeyResultListModule } from '@core/components/key-result-list/key-result-list.module';
import { ObjectiveParentCardModule } from '@core/components/objective-parent-card/objective-parent-card.module';
import { ObjectiveCardListModule } from '@core/components/objective-card-list/objective-card-list.module';
import { SidebarNavigationModule } from '@core/components/sidebar-navigation/sidebar-navigation.module';
import { TopBarModule } from '@core/components/top-bar';

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
