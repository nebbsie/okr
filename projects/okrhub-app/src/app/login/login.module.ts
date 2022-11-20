import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DirectivesModule } from '@directives/directives.module';
import { LoginFormComponent } from '@components/login-form/login-form.component';
import { ButtonComponent } from '@ui/button';
import { LinkComponent } from '@ui/link';
import { PageComponent } from '@ui/page';
import { TextComponent } from '@ui/text';

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
    TextComponent,
    ButtonComponent,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatIconModule,
    PageComponent,
    LoginFormComponent,
    LinkComponent,
  ],
})
export class LoginModule {}
