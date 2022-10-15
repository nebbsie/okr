import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { AlertModule, ButtonModule, LinkModule, TextModule } from '@core/ui';
import { DirectivesModule } from '@core/directives';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '@core/pipes';
import { InputModule } from '@core/ui/input';

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
