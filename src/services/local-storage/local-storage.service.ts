import { Injectable } from '@angular/core';
import { LocalStorageTypes } from '@services/local-storage/local-storage.types';
import {
  BehaviorSubject,
  distinctUntilChanged,
  Observable,
  shareReplay,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private subjects: {
    [key in keyof LocalStorageTypes]: BehaviorSubject<
      LocalStorageTypes[key] | undefined
    >;
  };

  constructor() {
    this.subjects = {
      selectedTeam: new BehaviorSubject<
        LocalStorageTypes['selectedTeam'] | undefined
      >(undefined),
      selectedWorkspace: new BehaviorSubject<
        LocalStorageTypes['selectedWorkspace'] | undefined
      >(undefined),
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

  set<T extends keyof LocalStorageTypes>(key: T, obj: LocalStorageTypes[T]) {
    localStorage.setItem(key, JSON.stringify(obj));
    this.subjects[key].next(obj);
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
