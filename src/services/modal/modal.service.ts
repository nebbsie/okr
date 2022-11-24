import { ComponentType } from '@angular/cdk/portal';
import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmModalComponent } from '@components/modals/confirm-modal';
import { CreateTeamModalComponent } from '@components/modals/create-team-modal';
import { CreateBoardModalComponent } from '@components/modals/create-board-modal';

@Injectable()
export class ModalService {
  constructor(private matDialog: MatDialog, private ngZone: NgZone) {}

  open<T extends ModalComponents>(
    componentOrTemplateRef: ComponentType<T>,
    data?: T['input']
  ): Promise<T['output']> {
    const config: MatDialogConfig<T['input']> = {
      data,
    };

    return this.ngZone.run(() => {
      return firstValueFrom(
        this.matDialog.open(componentOrTemplateRef, config).afterClosed()
      );
    });
  }
}

/**
 * WARNING: MAKE SURE YOU ADD EACH COMPONENT THAT IS GOING TO BE USED AS A MODAL HERE, OR THEY WON'T WORK!
 */
export type ModalComponents =
  | ConfirmModalComponent
  | CreateTeamModalComponent
  | CreateBoardModalComponent;
