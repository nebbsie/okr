import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardSettingsRoutingModule } from './board-settings-routing.module';
import { BoardSettingsComponent } from './board-settings.component';


@NgModule({
  declarations: [
    BoardSettingsComponent
  ],
  imports: [
    CommonModule,
    BoardSettingsRoutingModule
  ]
})
export class BoardSettingsModule { }
