import { isObservable, Observable, of } from 'rxjs';

export function makeObservable<T>(value: T | Observable<T>): Observable<T> {
  return isObservable(value) ? value : of(value);
}

/**
 * Removes all the undefined values from an object.
 */
export function sanitiseObject(obj: any): any {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });

  return obj;
}

export function isDefined<T>(x: T): x is NonNullable<T> {
  return x !== undefined && x !== null;
}
