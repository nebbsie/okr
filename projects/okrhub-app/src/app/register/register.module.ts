import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterFormComponent } from '@components/register-form';
import { PageComponent } from '@ui/page';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    PageComponent,
    RegisterFormComponent,
  ],
})
export class RegisterModule {}
