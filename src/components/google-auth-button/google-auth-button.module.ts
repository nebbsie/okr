import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthButtonComponent } from './google-auth-button.component';
import { ButtonModule } from '../../ui/button';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [GoogleAuthButtonComponent],
  imports: [CommonModule, ButtonModule, DirectivesModule],
  exports: [GoogleAuthButtonComponent],
})
export class GoogleAuthButtonModule {}
