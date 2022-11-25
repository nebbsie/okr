import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./board-home/board-home.module').then(
            (m) => m.BoardHomeModule
          ),
      },
      {
        path: 'members',
        loadChildren: () =>
          import('./board-members/board-members.module').then(
            (m) => m.BoardMembersModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./board-settings/board-settings.module').then(
            (m) => m.BoardSettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
