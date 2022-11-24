import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBoardModalComponent } from './create-board-modal.component';
import { TextComponent } from '@ui/text';
import { DirectivesModule } from '@directives/directives.module';
import { InputComponent } from '@ui/input';
import { FlexComponent } from '@ui/flex';
import { ButtonComponent } from '@ui/button';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [CreateBoardModalComponent],
  imports: [
    CommonModule,
    TextComponent,
    DirectivesModule,
    InputComponent,
    FlexComponent,
    ButtonComponent,
    PipesModule,
  ],
})
export class CreateBoardModalModule {}
