import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverResetRoutingModule } from './recover-reset-routing.module';
import { RecoverResetComponent } from './recover-reset.component';
import { PageModule } from '@core/ui';
import { ResetPasswordModule } from '@core/components/reset-password';
import { DirectivesModule } from '@core/directives';

@NgModule({
  declarations: [RecoverResetComponent],
  imports: [
    CommonModule,
    RecoverResetRoutingModule,
    PageModule,
    ResetPasswordModule,
    DirectivesModule,
  ],
})
export class RecoverResetModule {}
