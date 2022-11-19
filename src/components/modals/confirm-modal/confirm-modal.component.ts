import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalComponent } from '@services/modal';
import {
  ConfirmationModalInput,
  ConfirmationModalType,
} from './confirm-modal.types';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <ui-text weight="medium" marginBottom="mid">
      {{ message }}
    </ui-text>

    <ui-flex align="center" justify="flex-end">
      <ui-button
        marginRight="small"
        [disabled]="loading$ | Async"
        (click)="handleSelection(false)"
      >
        No
      </ui-button>

      <ui-button
        marginRight="small"
        [disabled]="loading$ | Async"
        [loading]="loading$ | Async"
        [colour]="type === ConfirmationModalType.WARNING ? 'warn' : 'primary'"
        (click)="handleSelection(true)"
      >
        Yes
      </ui-button>
    </ui-flex>
  `,
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent extends ModalComponent<
  ConfirmationModalInput,
  boolean
> {
  ConfirmationModalType = ConfirmationModalType;

  message!: string;

  type: ConfirmationModalType = ConfirmationModalType.WARNING;

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  private errorSubject$ = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject$.asObservable();
  error$ = this.errorSubject$.asObservable();

  ngOnInit(): void {
    this.message = this.input.message;
    this.type = this.input.type ?? ConfirmationModalType.WARNING;
  }

  handleSelection(selection: boolean) {
    if (!selection || this.input.action === undefined) {
      this.closeModal(selection);
      return;
    }

    this.loadingSubject$.next(true);
    this.errorSubject$.next(false);

    firstValueFrom(this.input.action())
      .then(() => {
        this.loadingSubject$.next(false);
        this.closeModal(true);
      })
      .catch((err) => this.errorSubject$.next(true));
  }
}
