import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import {
  MinimalKeyResult,
  Objective,
  ObjectivesCollection,
  Store,
} from '@services/store';
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
import { GetNewDragDropPosition, trackById } from '@services/utils';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { KeyResultItemDropAreaComponent } from '@components/key-results/key-result-item-drop-area/key-result-item-drop-area.component';
import { firstValueFrom, Subject } from 'rxjs';
import { PipesModule } from '@pipes/pipes.module';
import { Margin } from '@directives/margin';

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
    DragDropModule,
    KeyResultItemDropAreaComponent,
    PipesModule,
  ],
  template: `
    <ui-flex
      class="Objective"
      justify="space-between"
      align="center"
      [attr.data-dragging]="dragging"
      [marginBottom]="
        objective.keyResults.length > 0 ? KEY_RESULT_MARGIN : 'none'
      "
      [clickable]="true"
      (mouseenter)="mouseOver.emit()"
      (mouseleave)="mouseOut.emit()"
      (touchstart)="mouseOver.emit()"
      (touchend)="mouseOut.emit()"
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

    <ui-div
      cdkDropList
      class="KeyBoundary"
      [cdkDropListLockAxis]="'y'"
      [cdkDropListData]="objective.keyResults"
      (cdkDropListDropped)="handleMovedObjective($event)"
    >
      <app-key-result-item
        *ngFor="
          let minimalKeyResult of objective.keyResults;
          trackBy: trackById;
          let last = last
        "
        cdkDrag
        cdkDragBoundary=".KeyBoundary"
        [cdkDragStartDelay]="{ mouse: 0, touch: 150 }"
        [dragging]="(draggingId$ | Async) === minimalKeyResult.id"
        [marginBottom]="last ? 'none' : KEY_RESULT_MARGIN"
        [minimalKeyResult]="minimalKeyResult"
        [objective]="objective"
        (touchend)="handleTouchEnd()"
        (touchstart)="handleTouchStart(minimalKeyResult.id)"
      >
        <ng-template cdkDragPreview matchSize>
          <app-key-result-item
            class="KeyResultDragItem"
            [objective]="objective"
            [minimalKeyResult]="minimalKeyResult"
            [dragging]="true"
          ></app-key-result-item>
        </ng-template>

        <ng-template cdkDragPlaceholder>
          <app-key-result-item-drop-area
            [marginBottom]="last ? 'none' : KEY_RESULT_MARGIN"
          ></app-key-result-item-drop-area>
        </ng-template>
      </app-key-result-item>
    </ui-div>

    <app-key-result-create-form
      *ngIf="showCreateKeyResult && !dragging"
      [objective]="objective"
      (closed)="showCreateKeyResult = false"
    ></app-key-result-create-form>
  `,
  styleUrls: ['./objective-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveItemComponent {
  KEY_RESULT_MARGIN: Margin = 'xxxsmall';

  trackById = trackById;

  @Input() objective!: Objective;

  @Input()
  @HostBinding('attr.data-dragging')
  dragging = false;

  @Output() clicked = new EventEmitter<void>();
  @Output() mouseOver = new EventEmitter<void>();
  @Output() mouseOut = new EventEmitter<void>();

  showCreateKeyResult = false;
  timeout?: number;

  private draggingIdSubject$ = new Subject<string | undefined>();
  draggingId$ = this.draggingIdSubject$.asObservable();

  constructor(private store: Store) {}

  async handleMovedObjective(event: CdkDragDrop<MinimalKeyResult[]>) {
    // The item wasn't moved.
    if (event.currentIndex === event.previousIndex) {
      return;
    }

    const keyResults = this.objective.keyResults;
    const movingKeyResult = keyResults[event.previousIndex];
    const pos = GetNewDragDropPosition(event, keyResults);

    // 1 - removes the key result from the list
    // 2 - adds the new item
    // 3 - sorts them
    const newKeyResults = [
      ...keyResults.filter((kr) => kr.id !== movingKeyResult.id),
      { ...movingKeyResult, position: pos },
    ].sort((a, b) => a.position - b.position);

    const updateResult = this.store.update<ObjectivesCollection>(
      'objectives',
      this.objective.id,
      {
        keyResults: newKeyResults,
      }
    );

    await firstValueFrom(updateResult.value$);
  }

  handleTouchStart(id: string): void {
    this.timeout = window.setTimeout(() => {
      this.draggingIdSubject$.next(id);
    }, 200);
  }

  handleTouchEnd(): void {
    window.clearTimeout(this.timeout);
    this.draggingIdSubject$.next(undefined);
  }
}
