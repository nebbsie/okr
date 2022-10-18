import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './center.component';

@NgModule({
  declarations: [CenterComponent],
  exports: [CenterComponent],
  imports: [CommonModule],
})
export class CenterModule {}
