import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverSentRoutingModule } from './recover-sent-routing.module';
import { RecoverSentComponent } from './recover-sent.component';
import { DirectivesModule } from '@directives/directives.module';
import { ResetEmailSentComponent } from '@components/reset-email-sent';
import { PageComponent } from '@ui/page';

@NgModule({
  declarations: [RecoverSentComponent],
  imports: [
    CommonModule,
    RecoverSentRoutingModule,
    PageComponent,
    DirectivesModule,
    ResetEmailSentComponent,
  ],
})
export class RecoverSentModule {}
