import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardSettingsComponent } from './board-settings.component';

const routes: Routes = [
  {
    path: '',
    component: BoardSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardSettingsRoutingModule {}
