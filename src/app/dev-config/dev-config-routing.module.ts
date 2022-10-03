import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevConfigComponent } from './dev-config.component';

const routes: Routes = [
  {
    path: '',
    component: DevConfigComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevConfigRoutingModule {}
