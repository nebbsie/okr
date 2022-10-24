import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from '../../ui/button';
import { DirectivesModule } from '../../directives/directives.module';
import { LinkModule } from '../../ui/link';
import { MatDividerModule } from '@angular/material/divider';
import { TextModule } from '../../ui/text';
import { GoogleAuthButtonModule } from '../google-auth-button';
import { DividerTextModule } from '../../ui/divider-text/divider-text.module';
import { PipesModule } from '../../pipes/pipes.module';
import { AlertModule } from '../../ui/alert/alert.module';
import { InputModule } from '../../ui/input';

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
