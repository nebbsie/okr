import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarginDirective } from './margin';
import { HideDirective } from './hide';
import { AutoFocusDirective } from './auto-focus';

@NgModule({
  declarations: [MarginDirective, HideDirective, AutoFocusDirective],
  imports: [CommonModule],
  exports: [MarginDirective, HideDirective, AutoFocusDirective],
})
export class DirectivesModule {}
