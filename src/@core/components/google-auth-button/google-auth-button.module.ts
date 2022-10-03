import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthButtonComponent } from './google-auth-button.component';
import { ButtonModule } from '@core/ui/button';
import { DirectivesModule } from '@core/directives/directives.module';

@NgModule({
  declarations: [GoogleAuthButtonComponent],
  imports: [CommonModule, ButtonModule, DirectivesModule],
  exports: [GoogleAuthButtonComponent],
})
export class GoogleAuthButtonModule {}
