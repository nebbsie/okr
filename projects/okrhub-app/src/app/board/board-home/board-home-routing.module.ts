import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardHomeComponent } from './board-home.component';

const routes: Routes = [
  {
    path: '',
    component: BoardHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardHomeRoutingModule {}
