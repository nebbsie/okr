import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Observable } from 'rxjs';

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
