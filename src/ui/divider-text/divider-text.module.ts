import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerTextComponent } from './divider-text.component';
import { MatDividerModule } from '@angular/material/divider';
import { TextModule } from '../text';

@NgModule({
  declarations: [DividerTextComponent],
  imports: [CommonModule, MatDividerModule, TextModule],
  exports: [DividerTextComponent],
})
export class DividerTextModule {}
