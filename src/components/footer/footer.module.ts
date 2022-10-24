import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { CenterModule } from '@ui/center/center.module';
import { TextModule } from '../../ui';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@ui/icon';
import { FlexModule } from '@ui/flex';
import { DirectivesModule } from '../../directives';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [
    CommonModule,
    CenterModule,
    TextModule,
    MatIconModule,
    IconModule,
    FlexModule,
    DirectivesModule,
  ],
})
export class FooterModule {}
