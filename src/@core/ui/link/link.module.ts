import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './link.component';
import { TextModule } from '@core/ui/text';
import { RouterLinkWithHref, RouterModule } from '@angular/router';

@NgModule({
  declarations: [LinkComponent],
  imports: [CommonModule, TextModule, RouterLinkWithHref, RouterModule],
  exports: [LinkComponent],
})
export class LinkModule {}
