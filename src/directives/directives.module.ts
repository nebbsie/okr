import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarginDirective } from './margin';
import { HideDirective } from './hide';

@NgModule({
  declarations: [MarginDirective, HideDirective],
  imports: [CommonModule],
  exports: [MarginDirective, HideDirective],
})
export class DirectivesModule {}
