import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, firstValueFrom, map, Observable, Subject } from 'rxjs';
import { Objective, ObjectivesCollection, Store } from '@services/store';
import { ActivatedRoute } from '@angular/router';
import { isDefined } from '@utils/utils';
import { orderBy, where } from '@angular/fire/firestore';
import { GetNewDragDropPosition, trackById } from '@services/utils';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ScreenSizeService } from '@services/screen-size';
import { ModalService } from '@services/modal';
import { ObjectiveModalComponent } from '@components/modals/objective-modal';
import { Margin } from '@directives/margin';

@Component({
  selector: 'app-board-home',
  template: `
    <ui-div
      *ngIf="objectives$ | Async as objectives"
      class="ObjectiveBoundary"
      cdkDropList
      [cdkDropListLockAxis]="'y'"
      [cdkDropListData]="objectives"
      [cdkDropListAutoScrollDisabled]="false"
      [cdkDropListAutoScrollStep]="35"
      (cdkDropListSorted)="handleDraggedObjective()"
      (cdkDropListDropped)="handleMovedObjective($event)"
    >
      <app-objective-item
        *ngFor="let objective of objectives$ | Async; trackBy: trackById"
        cdkDrag
        cdkDragBoundary=".ObjectiveBoundary"
        [marginBottom]="OBJECTIVE_MARGIN"
        [cdkDragDisabled]="
          (draggingDisabled$ | Async) || mouseOverObjectiveId !== objective.id
        "
        [cdkDragStartDelay]="{ mouse: 0, touch: 200 }"
        [dragging]="(draggingId$ | Async) === objective.id"
        (touchstart)="handleTouchStart(objective.id)"
        (touchend)="handleTouchEnd()"
        [objective]="objective"
        (mouseOver)="mouseOverObjectiveId = objective.id"
        (mouseOut)="mouseOverObjectiveId = undefined"
        (clicked)="handleClick(objective)"
      >
        <ng-template cdkDragPreview matchSize>
          <app-objective-item
            [objective]="objective"
            [dragging]="true"
          ></app-objective-item>
        </ng-template>

        <ng-template cdkDragPlaceholder>
          <app-objective-item-drop-area
            [marginBottom]="OBJECTIVE_MARGIN"
          ></app-objective-item-drop-area>
        </ng-template>
      </app-objective-item>
    </ui-div>

    <app-objective-create-form
      [boardId$]="boardId$"
      [lastBoardPosition$]="lastBoardPosition$"
      marginBottom="xxxlarge"
    ></app-objective-create-form>
  `,
  styleUrls: ['./board-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardHomeComponent implements OnInit {
  OBJECTIVE_MARGIN: Margin = 'small';

  trackById = trackById;

  private draggingIdSubject$ = new Subject<string | undefined>();
  draggingId$ = this.draggingIdSubject$.asObservable();

  draggingDisabled$!: Observable<boolean>;
  mouseOverObjectiveId?: string;

  boardId$!: Observable<string>;
  lastBoardPosition$!: Observable<number | undefined>;
  objectives$!: Observable<Objective[]>;

  timeout?: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private screenSize: ScreenSizeService,
    private modal: ModalService
  ) {}

  handleDraggedObjective() {
    // TODO: do a vibrate.
  }

  ngOnInit() {
    this.boardId$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter(isDefined)
    );

    const objectivesCollection = this.store.where<ObjectivesCollection>(
      'objectives',
      this.boardId$.pipe(
        map((boardId) => [
          where('boardId', '==', boardId),
          orderBy('position', 'asc'),
        ])
      )
    );

    this.objectives$ = objectivesCollection.value$.pipe(filter(isDefined));

    this.lastBoardPosition$ = this.objectives$.pipe(
      map((objectives) => objectives.pop()?.position)
    );

    this.draggingDisabled$ = this.objectives$.pipe(
      map((objectives) => objectives.length < 2)
    );
  }

  async handleMovedObjective(event: CdkDragDrop<Objective[]>) {
    // The item wasn't moved.
    if (event.currentIndex === event.previousIndex) {
      return;
    }

    const objectives = await firstValueFrom(this.objectives$);
    const movingObjective = objectives[event.previousIndex];

    const pos = GetNewDragDropPosition(event, objectives);

    const updateResult = this.store.update<ObjectivesCollection>(
      'objectives',
      movingObjective.id,
      {
        position: pos,
      }
    );

    await firstValueFrom(updateResult.value$);
  }

  handleTouchStart(id: string): void {
    this.timeout = window.setTimeout(() => {
      console.log('ready');
      this.draggingIdSubject$.next(id);
    }, 200);
  }

  handleTouchEnd(): void {
    window.clearTimeout(this.timeout);
    this.draggingIdSubject$.next(undefined);
  }

  handleClick(objective: Objective): void {
    this.modal.open(
      ObjectiveModalComponent,
      {
        objectiveId: objective.id,
      },
      true
    );
  }
}
