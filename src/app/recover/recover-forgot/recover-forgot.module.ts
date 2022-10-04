import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverForgotRoutingModule } from './recover-forgot-routing.module';
import { RecoverForgotComponent } from './recover-forgot.component';
import { PageModule } from '@core/ui';
import { ForgotPasswordModule } from '@core/components/forgot-password/forgot-password.module';

@NgModule({
  declarations: [RecoverForgotComponent],
  imports: [
    CommonModule,
    RecoverForgotRoutingModule,
    PageModule,
    ForgotPasswordModule,
  ],
})
export class RecoverForgotModule {}
