import { ComponentType } from '@angular/cdk/portal';
import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponents } from './modal';
import { firstValueFrom } from 'rxjs';

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
