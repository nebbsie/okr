import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';
import { FlexComponent } from '@ui/flex';
import { ButtonComponent } from '@ui/button';
import { TextComponent } from '@ui/text';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [
    CommonModule,
    TextComponent,
    DirectivesModule,
    ButtonComponent,
    PipesModule,
    FlexComponent,
  ],
})
export class ConfirmModalModule {}
