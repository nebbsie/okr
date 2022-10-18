import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedOutNavigationComponent } from './logged-out-navigation.component';
import { ButtonModule, LinkModule, TextModule } from '@core/ui';
import { DirectivesModule } from '@core/directives';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoggedOutNavigationComponent],
  imports: [
    CommonModule,
    TextModule,
    LinkModule,
    ButtonModule,
    DirectivesModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [LoggedOutNavigationComponent],
})
export class LoggedOutNavigationModule {}
