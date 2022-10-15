import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form.component';
import {
  AlertModule,
  ButtonModule,
  DividerTextModule,
  LinkModule,
  TextModule,
} from '@core/ui';
import { DirectivesModule } from '@core/directives';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from '@core/pipes';
import { GoogleAuthButtonModule } from '@core/components/google-auth-button';
import { InputModule } from '@core/ui/input';

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
