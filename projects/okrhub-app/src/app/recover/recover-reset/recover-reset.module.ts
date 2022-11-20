import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverResetRoutingModule } from './recover-reset-routing.module';
import { RecoverResetComponent } from './recover-reset.component';
import { ResetPasswordComponent } from '@components/reset-password';
import { DirectivesModule } from '@directives/directives.module';
import { PageComponent } from '@ui/page';

@NgModule({
  declarations: [RecoverResetComponent],
  imports: [
    CommonModule,
    RecoverResetRoutingModule,
    PageComponent,
    DirectivesModule,
    ResetPasswordComponent,
  ],
})
export class RecoverResetModule {}
