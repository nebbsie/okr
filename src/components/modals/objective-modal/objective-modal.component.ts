import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { ModalComponent, ModalService } from '@services/modal';
import {
  ObjectiveModalInput,
  ObjectiveModalOutput,
} from '@components/modals/objective-modal/objective-modal.types';
import {
  GetResult,
  Objective,
  ObjectivesCollection,
  Store,
  UpdateData,
} from '@services/store';
import { firstValueFrom, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  ConfirmationModalType,
  ConfirmModalComponent,
} from '@components/modals/confirm-modal';

@Component({
  selector: 'app-objective-modal',
  template: `
    <app-modal-header (close)="close()">
      <app-more-options>
        <app-more-options-item icon="delete" title='Delete' (click)="handleDeleteItem()" />
      </app-more-options>
    </app-modal-header>

    <ui-spinner
      *ngIf="objectiveResult.loading$ | Async; else template"
    ></ui-spinner>

    <ng-template #template>
      <app-objective-name-edit
        [control]="titleControl"
        marginBottom="mid"
      ></app-objective-name-edit>
      <app-objective-description-edit
        [control]="descControl"
      ></app-objective-description-edit>
    </ng-template>
  `,
  styleUrls: ['./objective-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveModalComponent
  extends ModalComponent<ObjectiveModalInput, ObjectiveModalOutput>
  implements OnInit
{
  titleControl = new FormControl<string | undefined>(undefined);
  descControl = new FormControl<string | undefined>(undefined);

  objectiveResult!: GetResult<ObjectivesCollection>;
  objective?: Objective;

  constructor(private store: Store, private modal: ModalService) {
    super();
  }

  ngOnInit() {
    this.objectiveResult = this.store.get<ObjectivesCollection>(
      'objectives',
      this.input.objectiveId
    );

    firstValueFrom(this.objectiveResult.value$).then((objective) => {
      if (!objective) {
        // TODO: handle this error.
        return;
      }
      this.objective = objective;

      this.titleControl.setValue(objective.title);
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Delete') {
      this.handleDeleteItem();
    }
  }

  close() {
    if (!this.objective) {
      return;
    }

    const title = this.titleControl.value;
    const desc = this.descControl.value;

    const isNameChanged = title !== this.objective.title && title !== null;
    const isDescChanged = desc !== this.objective?.desc && desc !== null;

    let updateRequest: UpdateData<ObjectivesCollection> = {};

    if (isNameChanged && title) {
      updateRequest = { ...updateRequest, title };
    }

    if (isDescChanged && desc) {
      updateRequest = { ...updateRequest, desc };
    }

    // Check if no changes have been made. If not just close the modal.
    if (!isNameChanged && !isDescChanged) {
      this.closeModal(undefined);
      return;
    }

    const result = this.store.update<ObjectivesCollection>(
      'objectives',
      this.objective.id,
      updateRequest
    );

    firstValueFrom(result.value$).then((res) => {
      this.closeModal(undefined);
    });
  }

  handleDeleteItem(): void {
    this.modal
      .open(ConfirmModalComponent, {
        type: ConfirmationModalType.WARNING,
        message: 'Are you sure you want to delete this objective?',
        action: () => {
          if (!this.objective) {
            return of(undefined);
          }
          return this.store.delete<ObjectivesCollection>(
            'objectives',
            this.objective.id
          ).value$;
        },
      })
      .then((deleted) => {
        if (deleted) {
          this.closeModal(undefined);
        }
      });
  }
}
