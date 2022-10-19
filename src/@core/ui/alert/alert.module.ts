import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { MatIconModule } from '@angular/material/icon';
import { DirectivesModule } from '@core/directives/directives.module';
import { TextModule } from '@core/ui/text';
import { IconModule } from '@core/ui/icon';

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
