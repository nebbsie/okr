import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { TextModule } from '@ui/text';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [PageComponent],
  imports: [CommonModule, TextModule, MatTabsModule],
  exports: [PageComponent],
})
export class PageModule {}
