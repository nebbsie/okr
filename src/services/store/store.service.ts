import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  enableIndexedDbPersistence,
  Firestore,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from '@angular/fire/firestore';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  distinctUntilChanged,
  from,
  map,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { makeObservable, sanitiseObject } from '../../utils';
import {
  CreateData,
  CreateResult,
  DeleteResult,
  DocumentId,
  GetResult,
  ListenResult,
  SetData,
  SetResult,
  UntypedCreateData,
  UntypedUpdateData,
  UpdateData,
  UpdateResult,
  WhereConstraints,
  WhereResult,
} from './store.types';
import { FirebaseError } from './store.errors';
import { ConvertFirebaseError, StoreConverter } from './store.helpers';
import { StoreCollection } from './config/collections';

@Injectable({
  providedIn: 'root',
})
export class Store {
  constructor(private firestore: Firestore) {
    enableIndexedDbPersistence(this.firestore).then();
  }

  /**
   * Returns a random id for use in firebase.
   */
  getStoreId(): string {
    return doc(collection(this.firestore, '_')).id;
  }

  /**
   * Creates a new object in the store.
   */
  create<C extends StoreCollection>(
    collection: C['name'],
    request: CreateData<C>
  ): CreateResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const id = this.getStoreId();
    const value$ = combineLatest([makeObservable(request)]).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap(([_request]) =>
        setDoc(
          doc(this.firestore, collection, id),
          sanitiseObject({
            ..._request,
            id,
            createdTime: Timestamp.now(),
          } as UntypedCreateData)
        )
      ),
      map(() => id),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err, collection));
        loadingSubject$.next(false);
        return of(undefined);
      })
    );

    return {
      value$: value$.pipe(shareReplay(1), distinctUntilChanged()),
      error$: errorSubject$
        .asObservable()
        .pipe(startWith(undefined), shareReplay(1), distinctUntilChanged()),
      loading$: loadingSubject$
        .asObservable()
        .pipe(shareReplay(1), distinctUntilChanged()),
    };
  }

  /**
   * Updates an existing object in the store.
   */
  update<C extends StoreCollection>(
    collection: C['name'],
    id: DocumentId,
    request: UpdateData<C>
  ): UpdateResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const value$ = combineLatest([
      makeObservable(id),
      makeObservable(request),
    ]).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap(([_id, _request]) =>
        _id !== undefined
          ? updateDoc(
              doc(this.firestore, collection, _id).withConverter(
                StoreConverter(collection)
              ),
              sanitiseObject(_request as UntypedUpdateData)
            )
          : of(undefined)
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err, collection));
        loadingSubject$.next(false);
        return of(undefined);
      })
    );

    return {
      value$: value$.pipe(shareReplay(1), distinctUntilChanged()),
      error$: errorSubject$
        .asObservable()
        .pipe(startWith(undefined), shareReplay(1), distinctUntilChanged()),
      loading$: loadingSubject$
        .asObservable()
        .pipe(shareReplay(1), distinctUntilChanged()),
    };
  }

  /**
   * Creates an object in the store.
   */
  set<C extends StoreCollection>(
    collection: C['name'],
    request: SetData<C>
  ): SetResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const value$ = combineLatest([makeObservable(request)]).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap(([_request]) =>
        setDoc(
          doc(this.firestore, collection, _request.id).withConverter(
            StoreConverter(collection)
          ),
          sanitiseObject({
            ..._request,
            createdTime: serverTimestamp(),
          } as UntypedUpdateData)
        )
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err, collection));
        loadingSubject$.next(false);
        return of(undefined);
      })
    );

    return {
      value$: value$.pipe(shareReplay(1), distinctUntilChanged()),
      error$: errorSubject$
        .asObservable()
        .pipe(startWith(undefined), shareReplay(1), distinctUntilChanged()),
      loading$: loadingSubject$
        .asObservable()
        .pipe(shareReplay(1), distinctUntilChanged()),
    };
  }

  /**
   * Deletes an existing object in the store.
   */
  delete<C extends StoreCollection>(
    collection: C['name'],
    id: DocumentId
  ): DeleteResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const value$ = makeObservable(id).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap((_id) =>
        _id !== undefined
          ? deleteDoc(doc(this.firestore, collection, _id))
          : of(undefined)
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err, collection));
        loadingSubject$.next(false);
        return of(undefined);
      })
    );

    return {
      value$: value$.pipe(shareReplay(1), distinctUntilChanged()),
      error$: errorSubject$
        .asObservable()
        .pipe(startWith(undefined), shareReplay(1), distinctUntilChanged()),
      loading$: loadingSubject$
        .asObservable()
        .pipe(shareReplay(1), distinctUntilChanged()),
    };
  }

  /**
   * Gets a value from the store and ensures it's up-to-date via a where clause.
   */
  where<C extends StoreCollection>(
    col: C['name'],
    constraints: WhereConstraints = []
  ): WhereResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const value$ = combineLatest([makeObservable(constraints)]).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap(([_constraints]) => {
        return collectionData(
          query(
            collection(this.firestore, col).withConverter(StoreConverter(col)),
            ..._constraints
          )
        );
      }),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err, col));
        loadingSubject$.next(false);
        return of(undefined);
      })
    );

    return {
      value$: value$.pipe(distinctUntilChanged(), shareReplay(1)),
      error$: errorSubject$
        .asObservable()
        .pipe(startWith(undefined), distinctUntilChanged(), shareReplay(1)),
      loading$: loadingSubject$
        .asObservable()
        .pipe(distinctUntilChanged(), shareReplay(1)),
    };
  }

  /**
   * Gets a value from the store and ensures its up-to-date.
   */
  listen<C extends StoreCollection>(
    collection: C['name'],
    id: DocumentId
  ): ListenResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const value$ = makeObservable(id).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap((_id) =>
        _id !== undefined
          ? docData(
              doc(this.firestore, collection, _id).withConverter(
                StoreConverter(collection)
              )
            )
          : of(undefined)
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err, collection));
        loadingSubject$.next(false);
        return of(undefined);
      })
    );

    return {
      value$: value$.pipe(shareReplay(1), distinctUntilChanged()),
      error$: errorSubject$
        .asObservable()
        .pipe(startWith(undefined), shareReplay(1), distinctUntilChanged()),
      loading$: loadingSubject$
        .asObservable()
        .pipe(shareReplay(1), distinctUntilChanged()),
    };
  }

  /**
   * Gets a value from the store at the moment of calling. Is not kept up to date.
   */
  get<C extends StoreCollection>(
    collection: C['name'],
    id: DocumentId
  ): GetResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const value$ = makeObservable(id).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap((_id) =>
        _id !== undefined
          ? from(
              getDoc(
                doc(this.firestore, collection, _id).withConverter(
                  StoreConverter(collection)
                )
              )
            ).pipe(map((val) => val.data()))
          : of(undefined)
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err, collection));
        loadingSubject$.next(false);
        return of(undefined);
      })
    );

    return {
      value$: value$.pipe(shareReplay(1), distinctUntilChanged()),
      error$: errorSubject$
        .asObservable()
        .pipe(startWith(undefined), shareReplay(1), distinctUntilChanged()),
      loading$: loadingSubject$
        .asObservable()
        .pipe(shareReplay(1), distinctUntilChanged()),
    };
  }
}
