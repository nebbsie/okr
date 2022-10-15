import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileTopBarComponent } from './mobile-top-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TextModule } from '@core/ui';

@NgModule({
  declarations: [MobileTopBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TextModule,
  ],
  exports: [MobileTopBarComponent],
})
export class MobileTopBarModule {}
