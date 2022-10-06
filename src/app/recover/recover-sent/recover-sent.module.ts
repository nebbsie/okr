import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverSentRoutingModule } from './recover-sent-routing.module';
import { RecoverSentComponent } from './recover-sent.component';
import { PageModule } from '@core/ui';
import { ResetEmailSentModule } from '@core/components/reset-email-sent/reset-email-sent.module';
import { DirectivesModule } from '@core/directives';

@NgModule({
  declarations: [RecoverSentComponent],
  imports: [
    CommonModule,
    RecoverSentRoutingModule,
    PageModule,
    ResetEmailSentModule,
    DirectivesModule,
  ],
})
export class RecoverSentModule {}
