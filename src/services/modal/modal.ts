import { inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@components/modals/confirm-modal';
import { CreateTeamModalComponent } from '@components/modals/create-team-modal';

/**
 * WARNING: EACH MODAL COMPONENT MUST EXTEND THE FOLLOWING CLASS.
 */
export class ModalComponent<D = undefined, O = undefined> {
  public input: D;
  private modalRef: MatDialogRef<this>;
  public output!: O;

  constructor() {
    this.input = inject<D>(MAT_DIALOG_DATA);
    this.modalRef = inject(MatDialogRef);
  }

  closeModal(value: O): void {
    this.modalRef.close(value);
  }
}

/**
 * WARNING: MAKE SURE YOU ADD EACH COMPONENT THAT IS GOING TO BE USED AS A MODAL HERE, OR THEY WON'T WORK!
 */
export type ModalComponents = ConfirmModalComponent | CreateTeamModalComponent;
