import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalModule } from '@components/modals/confirm-modal/confirm-modal.module';
import { CreateTeamModalModule } from '@components/modals/create-team-modal/create-team-modal.module';
import { ModalService } from './modal.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfirmModalModule,
    CreateTeamModalModule,
    MatDialogModule,
  ],
  providers: [ModalService],
})
export class ModalModule {}
