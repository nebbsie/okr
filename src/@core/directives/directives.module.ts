import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarginDirective } from './margin.directive';
import { HideDirective } from './hide.directive';

@NgModule({
  declarations: [MarginDirective, HideDirective],
  imports: [CommonModule],
  exports: [MarginDirective, HideDirective],
})
export class DirectivesModule {}
