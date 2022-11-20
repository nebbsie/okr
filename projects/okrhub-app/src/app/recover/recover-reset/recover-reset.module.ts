import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverResetRoutingModule } from './recover-reset-routing.module';
import { RecoverResetComponent } from './recover-reset.component';
import { ResetPasswordComponent } from '@components/reset-password';
import { PageModule } from '@ui/page';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  declarations: [RecoverResetComponent],
  imports: [
    CommonModule,
    RecoverResetRoutingModule,
    PageModule,
    DirectivesModule,
    ResetPasswordComponent,
  ],
})
export class RecoverResetModule {}
