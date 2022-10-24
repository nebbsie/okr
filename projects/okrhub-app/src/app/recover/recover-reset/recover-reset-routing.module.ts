import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverResetComponent } from './recover-reset.component';

const routes: Routes = [
  {
    path: '',
    component: RecoverResetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverResetRoutingModule {}
