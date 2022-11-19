import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { TextModule } from '@ui/text';
import { DirectivesModule } from '@directives/directives.module';
import { ButtonModule } from '@ui/button';
import { PipesModule } from '@pipes/pipes.module';
import { FlexModule } from '@ui/flex';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    TextModule,
    DirectivesModule,
    ButtonModule,
    PipesModule,
    FlexModule,
  ],
})
export class ConfirmModalModule {}
