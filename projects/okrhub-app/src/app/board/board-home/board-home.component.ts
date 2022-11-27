import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, firstValueFrom, map, Observable } from 'rxjs';
import { Objective, ObjectivesCollection, Store } from '@services/store';
import { ActivatedRoute } from '@angular/router';
import { isDefined } from '@utils/utils';
import { orderBy, where } from '@angular/fire/firestore';
import { trackById } from '@services/utils';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ScreenSizeService } from '@services/screen-size';
import { ModalService } from '@services/modal';
import { ObjectiveModalComponent } from '@components/modals/objective-modal';

@Component({
  selector: 'app-board-home',
  template: `
    <ui-div
      *ngIf="objectives$ | Async as objectives"
      cdkDropList
      [cdkDropListData]="objectives"
      (cdkDropListDropped)="handleMovedObjective($event)"
    >
      <app-objective-item
        *ngFor="let objective of objectives$ | Async; trackBy: trackById"
        cdkDrag
        marginBottom="small"
        [cdkDragDisabled]="draggingDisabled$ | Async"
        [cdkDragStartDelay]="(touchDelay$ | Async) ?? 0"
        [objective]="objective"
        (click)="handleClick(objective)"
      >
        <app-objective-item-drop-area
          *cdkDragPlaceholder
        ></app-objective-item-drop-area>
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
  trackById = trackById;

  touchDelay$!: Observable<number>;
  draggingDisabled$!: Observable<boolean>;

  boardId$!: Observable<string>;
  lastBoardPosition$!: Observable<number | undefined>;
  objectives$!: Observable<Objective[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private screenSize: ScreenSizeService,
    private modal: ModalService
  ) {}

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

    this.touchDelay$ = this.screenSize
      .isMobile()
      .pipe(map((isMobile) => (isMobile ? 150 : 0)));

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

    const newPosition = event.currentIndex;
    const oldPosition = event.previousIndex;

    const movingObjective = objectives[oldPosition];
    const isStart = newPosition === 0;
    const isEnd = newPosition === objectives.length - 1;

    let pos;
    if (!isStart && !isEnd) {
      let beforePosition, afterPosition: Objective;
      if (newPosition > oldPosition) {
        beforePosition = objectives[event.currentIndex];
        afterPosition = objectives[event.currentIndex + 1];
      } else {
        beforePosition = objectives[event.currentIndex - 1];
        afterPosition = objectives[event.currentIndex];
      }
      pos = (beforePosition.position + afterPosition.position) / 2;
    } else if (isEnd) {
      pos = (objectives[objectives.length - 1].position ?? 0) + 10000;
    } else if (isStart) {
      pos = objectives[0].position / 2;
    }

    const updateResult = this.store.update<ObjectivesCollection>(
      'objectives',
      movingObjective.id,
      {
        position: pos,
      }
    );

    await firstValueFrom(updateResult.value$);
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
