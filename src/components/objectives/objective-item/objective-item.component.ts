import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Objective } from '@services/store';
import { TextComponent } from '@ui/text';
import { DivComponent } from '@ui/div';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { FlexComponent } from '@ui/flex';
import { DirectivesModule } from '@directives/directives.module';
import { IconComponent } from '@ui/icon';
import { MoreOptionsComponent } from '@components/more-options/more-options.component';
import { MoreOptionsItemComponent } from '@components/more-options-item/more-options-item.component';
import { KeyResultItemComponent } from '@components/key-results/key-result-item/key-result-item.component';
import { KeyResultCreateFormComponent } from '@components/key-results/key-result-create-form/key-result-create-form.component';
import { trackById } from '@services/utils';

@Component({
  selector: 'app-objective-item',
  standalone: true,
  imports: [
    DirectivesModule,
    DivComponent,
    FlexComponent,
    IconComponent,
    JsonPipe,
    KeyResultCreateFormComponent,
    KeyResultItemComponent,
    MoreOptionsComponent,
    MoreOptionsItemComponent,
    NgForOf,
    NgIf,
    TextComponent,
  ],
  template: `
    <ui-flex
      class="Objective"
      justify="space-between"
      align="center"
      [clickable]="true"
      (click)="clicked.emit()"
    >
      <ui-text>{{ objective.title }}</ui-text>

      <app-more-options>
        <app-more-options-item icon="add" (click)="showCreateKeyResult = true">
          Add Key Result
        </app-more-options-item>

        <app-more-options-item icon="edit" (click)="clicked.emit()">
          Edit
        </app-more-options-item>

        <app-more-options-item icon="delete"> Delete </app-more-options-item>
      </app-more-options>
    </ui-flex>

    <ng-container *ngIf="!dragging">
      <app-key-result-item
        *ngFor="
          let minimalKeyResult of objective.keyResults;
          trackBy: trackById;
          let last = last
        "
        [minimalKeyResult]="minimalKeyResult"
        [objective]="objective"
        [marginBottom]="last ? 'mid' : 'none'"
      ></app-key-result-item>

      <app-key-result-create-form
        *ngIf="showCreateKeyResult"
        [objective]="objective"
        (closed)="showCreateKeyResult = false"
      ></app-key-result-create-form>
    </ng-container>
  `,
  styleUrls: ['./objective-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveItemComponent {
  trackById = trackById;

  @Input() objective!: Objective;
  @Input() dragging = false;

  @Output() clicked = new EventEmitter<void>();

  showCreateKeyResult = false;
}
