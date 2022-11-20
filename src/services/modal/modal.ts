import { inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
