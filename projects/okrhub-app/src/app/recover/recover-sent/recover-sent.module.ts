import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverSentRoutingModule } from './recover-sent-routing.module';
import { RecoverSentComponent } from './recover-sent.component';
import { PageModule } from '@ui/page';
import { DirectivesModule } from '@directives/directives.module';
import { ResetEmailSentComponent } from '@components/reset-email-sent';

@NgModule({
  declarations: [RecoverSentComponent],
  imports: [
    CommonModule,
    RecoverSentRoutingModule,
    PageModule,
    DirectivesModule,
    ResetEmailSentComponent,
  ],
})
export class RecoverSentModule {}
