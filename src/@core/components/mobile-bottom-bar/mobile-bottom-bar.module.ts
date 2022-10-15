import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileBottomBarComponent } from './mobile-bottom-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonModule } from '@core/ui';

@NgModule({
  declarations: [MobileBottomBarComponent],
  exports: [MobileBottomBarComponent],
  imports: [CommonModule, MatToolbarModule, ButtonModule],
})
export class MobileBottomBarModule {}
