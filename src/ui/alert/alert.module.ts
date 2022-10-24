import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { MatIconModule } from '@angular/material/icon';
import { DirectivesModule } from '../../directives/directives.module';
import { TextModule } from '../text';
import { IconModule } from '../icon';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    MatIconModule,
    DirectivesModule,
    TextModule,
    IconModule,
  ],
  exports: [AlertComponent],
})
export class AlertModule {}
