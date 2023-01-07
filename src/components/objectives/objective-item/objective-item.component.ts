import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
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
import { firstValueFrom, map, Observable } from 'rxjs';
import { PipesModule } from '@pipes/pipes.module';
import { ScreenSizeService } from '@services/screen-size';

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
      [marginBottom]="objective.keyResults.length > 0 ? 'xsmall' : 'none'"
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

    <ng-container *ngIf="!dragging">
      <ui-div
        cdkDropList
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
          [cdkDragStartDelay]="(touchDelay$ | Async) ?? 0"
          [minimalKeyResult]="minimalKeyResult"
          [objective]="objective"
          [marginBottom]="last ? 'none' : 'xsmall'"
        >
          <app-key-result-item
            *cdkDragPreview
            [objective]="objective"
            [minimalKeyResult]="minimalKeyResult"
            [dragging]="true"
          ></app-key-result-item>

          <app-key-result-item-drop-area
            *cdkDragPlaceholder
            [marginBottom]="last ? 'none' : 'xsmall'"
          ></app-key-result-item-drop-area>
        </app-key-result-item>
      </ui-div>

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
export class ObjectiveItemComponent implements OnInit {
  trackById = trackById;

  @Input() objective!: Objective;

  @Input()
  @HostBinding('attr.data-dragging')
  dragging = false;

  @Output() clicked = new EventEmitter<void>();
  @Output() mouseOver = new EventEmitter<void>();
  @Output() mouseOut = new EventEmitter<void>();

  showCreateKeyResult = false;

  touchDelay$!: Observable<number>;

  constructor(private store: Store, private screenSize: ScreenSizeService) {}

  ngOnInit() {
    this.touchDelay$ = this.screenSize
      .isMobile()
      .pipe(map((isMobile) => (isMobile ? 150 : 0)));
  }

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
}
