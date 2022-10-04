import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'forgot',
    loadChildren: () =>
      import('./recover-forgot/recover-forgot.module').then(
        (m) => m.RecoverForgotModule
      ),
  },
  {
    path: 'reset',
    loadChildren: () =>
      import('./recover-reset/recover-reset.module').then(
        (m) => m.RecoverResetModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverRoutingModule {}
