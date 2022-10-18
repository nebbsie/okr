import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { CenterModule } from '@core/ui/center/center.module';
import { TextModule } from '@core/ui';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@core/ui/icon';
import { FlexModule } from '@core/ui/flex';
import { DirectivesModule } from '@core/directives';

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
