import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetEmailSentComponent } from './reset-email-sent.component';
import { ButtonModule, LinkModule, TextModule } from '@core/ui';
import { DirectivesModule } from '@core/directives';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ResetEmailSentComponent],
  imports: [
    CommonModule,
    TextModule,
    DirectivesModule,
    ButtonModule,
    LinkModule,
    RouterModule,
  ],
  exports: [ResetEmailSentComponent],
})
export class ResetEmailSentModule {}
