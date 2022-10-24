import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverForgotComponent } from './recover-forgot.component';

const routes: Routes = [
  {
    path: '',
    component: RecoverForgotComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverForgotRoutingModule {}
