import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { MatIconModule } from '@angular/material/icon';
import { DirectivesModule } from '@core/directives/directives.module';
import { TextModule } from '@core/ui/text';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, MatIconModule, DirectivesModule, TextModule],
  exports: [AlertComponent],
})
export class AlertModule {}
