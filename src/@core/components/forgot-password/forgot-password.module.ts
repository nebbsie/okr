import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AlertModule, ButtonModule, LinkModule, TextModule } from '@core/ui';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DirectivesModule } from '@core/directives';
import { PipesModule } from '@core/pipes';

@NgModule({
  declarations: [ForgotPasswordComponent],
  exports: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    TextModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    DirectivesModule,
    ButtonModule,
    PipesModule,
    AlertModule,
    LinkModule,
  ],
})
export class ForgotPasswordModule {}
