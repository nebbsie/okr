import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form.component';
import {
  AlertModule,
  ButtonModule,
  DividerTextModule,
  LinkModule,
  TextModule,
} from '../../ui';
import { DirectivesModule } from '../../directives';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from '../../pipes';
import { GoogleAuthButtonModule } from '../google-auth-button';
import { InputModule } from '../../ui/input';

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    TextModule,
    AlertModule,
    ButtonModule,
    DirectivesModule,
    MatInputModule,
    LinkModule,
    PipesModule,
    DividerTextModule,
    GoogleAuthButtonModule,
    InputModule,
  ],
  exports: [RegisterFormComponent],
})
export class RegisterFormModule {}
