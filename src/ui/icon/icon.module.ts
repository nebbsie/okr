import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, MatIconModule, RouterModule],
  exports: [IconComponent],
})
export class IconModule {}
