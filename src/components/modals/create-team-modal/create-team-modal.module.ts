import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamModalComponent } from './create-team-modal.component';
import { TextModule } from '@ui/text';
import { DirectivesModule } from '@directives/directives.module';
import { InputModule } from '@ui/input';
import { FlexModule } from '@ui/flex';
import { ButtonModule } from '@ui/button';

@NgModule({
  declarations: [CreateTeamModalComponent],
  imports: [
    CommonModule,
    TextModule,
    DirectivesModule,
    InputModule,
    FlexModule,
    ButtonModule,
  ],
})
export class CreateTeamModalModule {}
