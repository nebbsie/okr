import { AsyncPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as Rx from 'rxjs';

// FIXME: switch back to async after https://github.com/angular/angular/issues/16982
// eslint-disable-next-line @angular-eslint/no-pipe-impure
@Pipe({ name: 'Async', pure: false })
export class OkrhubAsyncPipe extends AsyncPipe implements PipeTransform {
  // @ts-ignore
  transform<T>(obj$: null | undefined): undefined;
  // @ts-ignore
  transform<T>(
    obj$: Promise<T> | Rx.Observable<T> | null | undefined
  ): T | undefined;
  // @ts-ignore
  transform<T>(obj$: any): T | undefined {
    return super.transform<T>(obj$) ?? undefined;
  }
}
