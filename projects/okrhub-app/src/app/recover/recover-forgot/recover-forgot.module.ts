import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverForgotRoutingModule } from './recover-forgot-routing.module';
import { RecoverForgotComponent } from './recover-forgot.component';
import { PageModule } from '@ui/page';
import { DirectivesModule } from '@directives/directives.module';
import { ForgotPasswordComponent } from '@components/forgot-password';

@NgModule({
  declarations: [RecoverForgotComponent],
  imports: [
    CommonModule,
    RecoverForgotRoutingModule,
    PageModule,
    DirectivesModule,
    ForgotPasswordComponent,
  ],
})
export class RecoverForgotModule {}
