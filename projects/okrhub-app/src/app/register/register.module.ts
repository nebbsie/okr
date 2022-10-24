import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterFormModule } from '@components/register-form';
import { PageModule } from '@ui/page';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    RegisterFormModule,
    PageModule,
  ],
})
export class RegisterModule {}
