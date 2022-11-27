import { ComponentType } from '@angular/cdk/portal';
import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmModalComponent } from '@components/modals/confirm-modal';
import { CreateTeamModalComponent } from '@components/modals/create-team-modal';
import { CreateBoardModalComponent } from '@components/modals/create-board-modal';
import { ObjectiveModalComponent } from '@components/modals/objective-modal';
import { ScreenSizeService } from '@services/screen-size';

@Injectable()
export class ModalService {
  constructor(
    private matDialog: MatDialog,
    private ngZone: NgZone,
    private screenSizeService: ScreenSizeService
  ) {}

  async open<T extends ModalComponents>(
    component: ComponentType<T>,
    data?: T['input'],
    fullScreen?: boolean
  ): Promise<T['output']> {
    const isMobile = await firstValueFrom(this.screenSizeService.isMobile());

    let config: MatDialogConfig<T['input']> = {
      data,
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      disableClose: true,
    };

    if (fullScreen) {
      config = {
        ...config,
        width: isMobile ? '100%' : '90%',
        height: isMobile ? '100%' : '90%',
        maxWidth: '100%',
        maxHeight: '100%',
      };
    }

    return this.ngZone.run(() => {
      return firstValueFrom(
        this.matDialog.open(component, config).afterClosed()
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
  | CreateBoardModalComponent
  | ObjectiveModalComponent;
