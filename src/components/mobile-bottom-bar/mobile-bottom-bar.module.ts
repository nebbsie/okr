import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileBottomBarComponent } from './mobile-bottom-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonModule } from '../../ui';
import { AvatarModule } from '@ui/avatar/avatar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MobileBottomBarComponent],
  exports: [MobileBottomBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    ButtonModule,
    AvatarModule,
    RouterModule,
  ],
})
export class MobileBottomBarModule {}
