import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamModalComponent } from './create-team-modal.component';
import { DirectivesModule } from '@directives/directives.module';
import { FlexComponent } from '@ui/flex';
import { ButtonComponent } from '@ui/button';
import { InputComponent } from '@ui/input';
import { TextComponent } from '@ui/text';

@NgModule({
  declarations: [CreateTeamModalComponent],
  imports: [
    CommonModule,
    TextComponent,
    DirectivesModule,
    ButtonComponent,
    FlexComponent,
    InputComponent,
  ],
})
export class CreateTeamModalModule {}
