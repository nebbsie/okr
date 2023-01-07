import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileBoardsComponent } from './mobile-boards.component';

const routes: Routes = [
  {
    path: '',
    component: MobileBoardsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileBoardsRoutingModule {}
