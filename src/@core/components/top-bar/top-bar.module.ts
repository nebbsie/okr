import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LinkModule, TextModule } from '@core/ui';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [TopBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TextModule,
    MatMenuModule,
    LinkModule,
  ],
  exports: [TopBarComponent],
})
export class TopBarModule {}
