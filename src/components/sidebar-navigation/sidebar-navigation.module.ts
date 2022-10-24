import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavigationComponent } from './sidebar-navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { TextModule } from '../../ui';
import { DirectivesModule } from '../../directives';

@NgModule({
  declarations: [SidebarNavigationComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    TextModule,
    DirectivesModule,
  ],
  exports: [SidebarNavigationComponent],
})
export class SidebarNavigationModule {}
