import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { AlertModule, ButtonModule, LinkModule, TextModule } from '@core/ui';
import { DirectivesModule } from '@core/directives';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '@core/pipes';
import { PasswordInputModule } from '@core/components/password-input';

@NgModule({
  declarations: [ResetPasswordComponent],
  exports: [ResetPasswordComponent],
  imports: [
    CommonModule,
    TextModule,
    DirectivesModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ButtonModule,
    MatIconModule,
    PipesModule,
    LinkModule,
    PasswordInputModule,
    AlertModule,
  ],
})
export class ResetPasswordModule {}
