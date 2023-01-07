import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

export function trackById(_: number, obj: { id: string }): string {
  return obj.id;
}

export function PromiseToObservable(func: () => any): Observable<any> {
  return fromPromise(
    (async (): Promise<any> => {
      return func();
    })()
  );
}

export function GetNewDragDropPosition<T extends { position: number }>(
  event: CdkDragDrop<T[]>,
  items: T[]
): number {
  const newPosition = event.currentIndex;
  const oldPosition = event.previousIndex;

  const isStart = newPosition === 0;
  const isEnd = newPosition === items.length - 1;

  let pos: number;
  if (!isStart && !isEnd) {
    let beforePosition, afterPosition: T;
    if (newPosition > oldPosition) {
      beforePosition = items[event.currentIndex];
      afterPosition = items[event.currentIndex + 1];
    } else {
      beforePosition = items[event.currentIndex - 1];
      afterPosition = items[event.currentIndex];
    }
    pos = (beforePosition.position + afterPosition.position) / 2;
  } else if (isEnd) {
    pos = (items[items.length - 1].position ?? 0) + 10000;
  } else {
    pos = items[0].position / 2;
  }

  return pos;
}
