import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverForgotRoutingModule } from './recover-forgot-routing.module';
import { RecoverForgotComponent } from './recover-forgot.component';
import { PageModule } from '@ui/page';
import { ForgotPasswordModule } from '@components/forgot-password';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  declarations: [RecoverForgotComponent],
  imports: [
    CommonModule,
    RecoverForgotRoutingModule,
    PageModule,
    ForgotPasswordModule,
    DirectivesModule,
  ],
})
export class RecoverForgotModule {}
