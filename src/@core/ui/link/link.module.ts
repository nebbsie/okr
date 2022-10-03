import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './link.component';
import { TextModule } from '@core/ui/text';
import { RouterLinkWithHref } from '@angular/router';

@NgModule({
  declarations: [LinkComponent],
  imports: [CommonModule, TextModule, RouterLinkWithHref],
  exports: [LinkComponent],
})
export class LinkModule {}
