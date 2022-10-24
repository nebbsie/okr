import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { AlertModule, ButtonModule, LinkModule, TextModule } from '../../ui';
import { DirectivesModule } from '../../directives';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '../../pipes';
import { InputModule } from '../../ui/input';

@NgModule({
  declarations: [ResetPasswordComponent],
  exports: [ResetPasswordComponent],
  imports: [
    CommonModule,
    TextModule,
    DirectivesModule,
    ReactiveFormsModule,
    ButtonModule,
    MatIconModule,
    PipesModule,
    LinkModule,
    AlertModule,
    InputModule,
  ],
})
export class ResetPasswordModule {}
