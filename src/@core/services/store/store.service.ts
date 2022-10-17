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
  runTransaction,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from '@angular/fire/firestore';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  from,
  map,
  shareReplay,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { makeObservable, sanitiseObject } from '@core/utils';
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
import { Transaction, TransactionOptions } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class Store {
  constructor(private firestore: Firestore) {
    enableIndexedDbPersistence(this.firestore).then();
  }

  runInTransaction<T>(
    func: (transaction: Transaction) => Promise<T>,
    options?: TransactionOptions
  ) {
    return runTransaction(this.firestore, func, options);
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
    request: CreateData<C['type']>
  ): CreateResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const id = this.getStoreId();
    const result$ = combineLatest([makeObservable(request)]).pipe(
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
        errorSubject$.next(ConvertFirebaseError(err));
        loadingSubject$.next(false);
        throw err;
      })
    );

    return {
      result$: result$.pipe(shareReplay()),
      error$: errorSubject$.asObservable(),
      loading$: loadingSubject$.asObservable(),
    };
  }

  /**
   * Updates an existing object in the store.
   */
  update<C extends StoreCollection>(
    collection: C['name'],
    id: DocumentId,
    request: UpdateData<C['type']>
  ): UpdateResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const result$ = combineLatest([
      makeObservable(id),
      makeObservable(request),
    ]).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap(([_id, _request]) =>
        updateDoc(
          doc(this.firestore, collection, _id).withConverter(
            StoreConverter(collection)
          ),
          sanitiseObject(_request as UntypedUpdateData)
        )
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err));
        loadingSubject$.next(false);
        throw err;
      })
    );

    return {
      result$: result$.pipe(shareReplay()),
      error$: errorSubject$.asObservable(),
      loading$: loadingSubject$.asObservable(),
    };
  }

  /**
   * Creates an object in the store.
   */
  set<C extends StoreCollection>(
    collection: C['name'],
    request: SetData<C['type']>
  ): SetResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const result$ = combineLatest([makeObservable(request)]).pipe(
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
        errorSubject$.next(ConvertFirebaseError(err));
        loadingSubject$.next(false);
        throw err;
      })
    );

    return {
      result$: result$.pipe(shareReplay()),
      error$: errorSubject$.asObservable(),
      loading$: loadingSubject$.asObservable(),
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

    const result$ = makeObservable(id).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap((id) => deleteDoc(doc(this.firestore, collection, id))),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err));
        loadingSubject$.next(false);
        throw err;
      })
    );

    return {
      result$: result$.pipe(shareReplay()),
      error$: errorSubject$.asObservable(),
      loading$: loadingSubject$.asObservable(),
    };
  }

  /**
   * Gets a value from the store and ensures its up-to-date via a where clause.
   */
  where<C extends StoreCollection>(
    col: C['name'],
    constraints: WhereConstraints = []
  ): WhereResult<C> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const result$ = combineLatest([makeObservable(constraints)]).pipe(
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
        errorSubject$.next(ConvertFirebaseError(err));
        loadingSubject$.next(false);
        throw err;
      })
    );

    return {
      result$: result$.pipe(shareReplay()),
      error$: errorSubject$.asObservable(),
      loading$: loadingSubject$.asObservable(),
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

    const result$ = makeObservable(id).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap((_id) =>
        docData(
          doc(this.firestore, collection, _id).withConverter(
            StoreConverter(collection)
          )
        )
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err));
        loadingSubject$.next(false);
        throw err;
      })
    );

    return {
      result$: result$.pipe(shareReplay()),
      error$: errorSubject$.asObservable(),
      loading$: loadingSubject$.asObservable(),
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

    const result$ = makeObservable(id).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap((_id) =>
        from(
          getDoc(
            doc(this.firestore, collection, _id).withConverter(
              StoreConverter(collection)
            )
          )
        ).pipe(map((val) => val.data()))
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(ConvertFirebaseError(err));
        loadingSubject$.next(false);
        throw err;
      })
    );

    return {
      result$: result$.pipe(shareReplay()),
      error$: errorSubject$.asObservable(),
      loading$: loadingSubject$.asObservable(),
    };
  }
}
