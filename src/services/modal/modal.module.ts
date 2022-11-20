import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './modal.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateTeamModalModule } from '@components/modals/create-team-modal/create-team-modal.module';
import { ConfirmModalModule } from '@components/modals/confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    CreateTeamModalModule,
    ConfirmModalModule,
  ],
  providers: [ModalService],
})
export class ModalModule {}
