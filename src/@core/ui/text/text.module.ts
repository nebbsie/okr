import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './text.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TextComponent],
  imports: [CommonModule, RouterModule],
  exports: [TextComponent],
})
export class TextModule {}
