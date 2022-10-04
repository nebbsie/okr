import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverResetRoutingModule } from './recover-reset-routing.module';
import { RecoverResetComponent } from './recover-reset.component';


@NgModule({
  declarations: [
    RecoverResetComponent
  ],
  imports: [
    CommonModule,
    RecoverResetRoutingModule
  ]
})
export class RecoverResetModule { }
