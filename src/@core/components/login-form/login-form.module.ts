import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from '@core/ui/button';
import { DirectivesModule } from '@core/directives/directives.module';
import { LinkModule } from '@core/ui/link';
import { MatDividerModule } from '@angular/material/divider';
import { TextModule } from '@core/ui/text';
import { GoogleAuthButtonModule } from '@core/components/google-auth-button';
import { DividerTextModule } from '@core/ui/divider-text/divider-text.module';
import { PipesModule } from '@core/pipes/pipes.module';
import { AlertModule } from '@core/ui/alert/alert.module';
import { InputModule } from '@core/ui/input';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    ButtonModule,
    DirectivesModule,
    LinkModule,
    MatDividerModule,
    TextModule,
    GoogleAuthButtonModule,
    DividerTextModule,
    PipesModule,
    AlertModule,
    InputModule,
  ],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
