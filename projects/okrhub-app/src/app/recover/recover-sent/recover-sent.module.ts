import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverSentRoutingModule } from './recover-sent-routing.module';
import { RecoverSentComponent } from './recover-sent.component';
import { PageModule } from '@ui/page';
import { ResetEmailSentModule } from '@components/reset-email-sent';
import { DirectivesModule } from '@directives/directives.module';

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
