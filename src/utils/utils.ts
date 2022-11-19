import { isObservable, Observable, of } from 'rxjs';

export function makeObservable<T>(value: T | Observable<T>): Observable<T> {
  return isObservable(value) ? value : of(value);
}

/**
 * Removes all the undefined values from an object.
 */
export function sanitiseObject(obj: any): any {
  Object.keys(obj).forEach((key) => {
    // Remove undefined items.
    if (obj[key] === undefined) {
      delete obj[key];
    }

    // Convert Javascript maps to standard map.
    if (obj[key] instanceof Map) {
      let newMap: { [id: string]: any } = {};
      obj[key].forEach((value: any, _key: string) => {
        newMap[_key] = value;
      });
      obj[key] = newMap;
    }
  });

  return obj;
}

export function isDefined<T>(x: T): x is NonNullable<T> {
  return x !== undefined && x !== null;
}

/**
 * Returns all the keys that are required on an interface.
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * Returns all the potentially undefined keys.
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
