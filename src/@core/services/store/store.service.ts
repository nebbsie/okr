import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  enableIndexedDbPersistence,
  Firestore,
  FirestoreDataConverter,
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
  from,
  map,
  shareReplay,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { makeObservable, sanitiseObject } from '@core/utils';
import {
  CreateResult,
  DeleteResult,
  DocumentId,
  FirebaseError,
  GetResult,
  ListenResult,
  SetResult,
  UntypedCreateData,
  UntypedUpdateData,
  UpdateResult,
  WhereConstraints,
  WhereResult,
} from './store.types';
import {
  CreateData,
  SetData,
  StoreDocument,
  UpdateData,
} from '@core/services/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
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
  create<T extends StoreDocument>(
    collection: string,
    request: CreateData<T>
  ): CreateResult {
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
        errorSubject$.next(this.getError(err));
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
  update<T extends StoreDocument>(
    collection: string,
    id: DocumentId,
    request: UpdateData<T>,
    converter: FirestoreDataConverter<T>
  ): UpdateResult {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const result$ = combineLatest([
      makeObservable(id),
      makeObservable(request),
    ]).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap(([_id, _request]) =>
        updateDoc(
          doc(this.firestore, collection, _id).withConverter(converter),
          sanitiseObject(_request as UntypedUpdateData)
        )
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(this.getError(err));
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
  set<T extends StoreDocument>(
    collection: string,
    request: SetData<T>,
    converter: FirestoreDataConverter<T>
  ): SetResult {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const result$ = combineLatest([makeObservable(request)]).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap(([_request]) =>
        setDoc(
          doc(this.firestore, collection, _request.id).withConverter(converter),
          sanitiseObject({
            ..._request,
            createdTime: serverTimestamp(),
          } as UntypedUpdateData)
        )
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(this.getError(err));
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
  delete(collection: string, id: DocumentId): DeleteResult {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const result$ = makeObservable(id).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap((id) => deleteDoc(doc(this.firestore, collection, id))),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(this.getError(err));
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
  where<T extends StoreDocument>(
    col: string,
    constraints: WhereConstraints = [],
    converter: FirestoreDataConverter<T>
  ): WhereResult<T> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const result$ = combineLatest([makeObservable(constraints)]).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap(([_constraints]) => {
        return collectionData(
          query(
            collection(this.firestore, col).withConverter(converter),
            ..._constraints
          )
        );
      }),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(this.getError(err));
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
  listen<T extends StoreDocument>(
    collection: string,
    id: DocumentId,
    converter: FirestoreDataConverter<T>
  ): ListenResult<T> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const result$ = makeObservable(id).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap((_id) =>
        docData(doc(this.firestore, collection, _id).withConverter(converter))
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(this.getError(err));
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
  get<T extends StoreDocument>(
    collection: string,
    id: DocumentId,
    converter: FirestoreDataConverter<T>
  ): GetResult<T> {
    const errorSubject$ = new Subject<FirebaseError>();
    const loadingSubject$ = new BehaviorSubject(false);

    const result$ = makeObservable(id).pipe(
      tap(() => loadingSubject$.next(true)),
      switchMap((_id) =>
        from(
          getDoc(doc(this.firestore, collection, _id).withConverter(converter))
        ).pipe(map((val) => val.data()))
      ),
      tap(() => loadingSubject$.next(false)),
      catchError((err) => {
        errorSubject$.next(this.getError(err));
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

  getError(err: any): FirebaseError {
    const code = err.code as string;
    const isDefinedError = code in FirebaseError;
    if (isDefinedError) {
      console.error(
        `Error is currently not defined. You need to add: ${code} to FirebaseError enum.`
      );
    }
    switch (code) {
      case FirebaseError.PERMISSION_DENIED:
        return FirebaseError.PERMISSION_DENIED;
      default:
        return FirebaseError.UNKNOWN;
    }
  }
}
