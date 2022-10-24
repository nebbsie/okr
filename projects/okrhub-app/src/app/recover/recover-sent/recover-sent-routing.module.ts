import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverSentComponent } from './recover-sent.component';

const routes: Routes = [{ path: '', component: RecoverSentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverSentRoutingModule {}
