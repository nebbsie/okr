import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { DirectivesModule } from '@core/directives/directives.module';
import { TextModule } from '@core/ui/text';
import { ButtonModule } from '@core/ui/button';
import { LinkModule } from '@core/ui/link';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormModule } from '@core/components/login-form';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    DirectivesModule,
    TextModule,
    ButtonModule,
    LinkModule,
    MatProgressBarModule,
    CoolSocialLoginButtonsModule,
    ReactiveFormsModule,
    MatIconModule,
    LoginFormModule,
  ],
})
export class LoginModule {}
