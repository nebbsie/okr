import { Injectable } from '@angular/core';
import { LocalStorageTypes } from '@services/local-storage/local-storage.types';
import {
  distinctUntilChanged,
  Observable,
  ReplaySubject,
  shareReplay,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private subjects: {
    [key in keyof LocalStorageTypes]: ReplaySubject<
      LocalStorageTypes[key] | undefined
    >;
  };

  constructor() {
    this.subjects = {
      selectedTeam: new ReplaySubject<
        LocalStorageTypes['selectedTeam'] | undefined
      >(1),
      selectedWorkspace: new ReplaySubject<
        LocalStorageTypes['selectedWorkspace'] | undefined
      >(1),
    };

    const selectedTeam = localStorage.getItem('selectedTeam');
    if (selectedTeam) {
      this.subjects.selectedTeam.next(
        JSON.parse(selectedTeam) as
          | LocalStorageTypes['selectedTeam']
          | undefined
      );
    }

    const selectedWorkspace = localStorage.getItem('selectedWorkspace');
    if (selectedWorkspace) {
      this.subjects.selectedWorkspace.next(
        JSON.parse(selectedWorkspace) as
          | LocalStorageTypes['selectedWorkspace']
          | undefined
      );
    }
  }

  set<T extends keyof LocalStorageTypes>(
    key: T,
    obj: LocalStorageTypes[T] | undefined
  ) {
    localStorage.setItem(key, JSON.stringify(obj));
    this.subjects[key].next(obj);
  }

  delete<T extends keyof LocalStorageTypes>(key: T) {
    // localStorage.removeItem(key);
    // this.subjects[key].next(undefined);
  }

  get<T extends keyof LocalStorageTypes>(
    key: T
  ): Observable<LocalStorageTypes[T] | undefined> {
    const res = localStorage.getItem(key);
    if (res) {
      this.subjects[key].next(
        JSON.parse(res) as LocalStorageTypes[T] | undefined
      );
    }

    return this.subjects[key]
      .asObservable()
      .pipe(shareReplay(), distinctUntilChanged());
  }
}
