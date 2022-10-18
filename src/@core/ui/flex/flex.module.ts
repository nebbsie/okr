import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexComponent } from './flex.component';

@NgModule({
  declarations: [FlexComponent],
  exports: [FlexComponent],
  imports: [CommonModule],
})
export class FlexModule {}
