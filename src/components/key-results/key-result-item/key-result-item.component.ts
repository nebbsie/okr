import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {
  DocumentState,
  KeyResultCollection,
  MinimalKeyResult,
  Objective,
  ObjectivesCollection,
  Store,
} from '@services/store';
import { NgIf } from '@angular/common';
import { FlexComponent } from '@ui/flex';
import { IconComponent } from '@ui/icon';
import { MoreOptionsComponent } from '@components/more-options/more-options.component';
import { MoreOptionsItemComponent } from '@components/more-options-item/more-options-item.component';
import { ModalService } from '@services/modal';
import { ConfirmModalComponent } from '@components/modals/confirm-modal';
import { firstValueFrom } from 'rxjs';
import { PromiseToObservable } from '@services/utils';

@Component({
  selector: 'app-key-result-item',
  standalone: true,
  imports: [
    FlexComponent,
    IconComponent,
    MoreOptionsComponent,
    MoreOptionsItemComponent,
    NgIf,
  ],
  template: `
    <!--    <ui-icon *ngIf="!dragging" size="xmid">subdirectory_arrow_right</ui-icon>-->

    <ui-flex
      class="Container"
      justify="space-between"
      align="center"
      [attr.data-dragging]="dragging"
      [clickable]="true"
      [fullWidth]="true"
    >
      {{ minimalKeyResult.name }}

      <app-more-options>
        <app-more-options-item icon="edit"> Edit </app-more-options-item>
        <app-more-options-item icon="delete" (click)="delete()">
          Delete
        </app-more-options-item>
      </app-more-options>
    </ui-flex>
  `,
  styleUrls: ['./key-result-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyResultItemComponent {
  @Input() minimalKeyResult!: MinimalKeyResult;
  @Input() objective!: Objective;
  @Input()
  @HostBinding('attr.data-dragging')
  dragging!: boolean;

  constructor(private store: Store, private modal: ModalService) {}

  async delete() {
    await this.modal.open(ConfirmModalComponent, {
      message: 'Are you sure you want to delete the key result?',
      action: () => {
        return PromiseToObservable(async () => {
          // Set the key result as removed.
          await this.store.update<KeyResultCollection>(
            'keyResults',
            this.minimalKeyResult.id,
            { state: DocumentState.REMOVED }
          ).value$;

          // Remove the key result from the objective.
          return firstValueFrom(
            this.store.update<ObjectivesCollection>(
              'objectives',
              this.objective.id,
              {
                keyResults: this.objective.keyResults.filter(
                  (kr) => kr.id !== this.minimalKeyResult.id
                ),
              }
            ).value$
          );
        });
      },
    });
  }
}
