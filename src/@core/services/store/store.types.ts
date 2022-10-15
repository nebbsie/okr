import { QueryConstraint } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export type OmittedStoreObjectParams = keyof StoreDocument;

export type UpdateData<T extends StoreDocument> = DualParam<Partial<T>>;

export type WhereConstraints = DualParam<QueryConstraint[]>;

export type SetData<T extends StoreDocument> = DualParam<
  Omit<T, OmittedStoreObjectParams> & { id: string }
>;

export type CreateData<T extends StoreDocument> = DualParam<
  Omit<T, OmittedStoreObjectParams>
>;

export type DocumentId = DualParam<string>;

export interface StoreDocument {
  readonly id: string;
  readonly createdTime: ServerTimestamp;
}

export interface ServerTimestamp {
  readonly seconds: number;
  readonly nanoseconds: number;
}

export type DualParam<T> = T | Observable<T>;

export type UntypedUpdateData = { [field: string]: any };

export type UntypedSetData = {
  readonly [field: string]: any;
  readonly createdTime: any;
  readonly id: string;
};

export type UntypedCreateData = {
  readonly [field: string]: any;
  readonly createdTime: any;
  readonly id: string;
};

export function transformStoreDocumentFields(data: any): StoreDocument {
  if (!data.id) {
    throw new Error('Could not find id in transformer.');
  }

  if (!data.createdTime) {
    console.error('Could not find createdTime in transformer.');
  }

  return {
    id: data.id,
    createdTime: data.createdTime,
  };
}

export type StoreResult<T> = {
  readonly loading$: Observable<boolean>;
  readonly error$: Observable<FirebaseError>;
  readonly result$: Observable<T>;
};

export type CreateResult = StoreResult<string>;
export type DeleteResult = StoreResult<void>;
export type SetResult = StoreResult<void>;
export type UpdateResult = StoreResult<void>;
export type WhereResult<T extends StoreDocument> = StoreResult<T[]>;
export type GetResult<T extends StoreDocument> = StoreResult<T | undefined>;
export type ListenResult<T extends StoreDocument> = StoreResult<T | undefined>;

export interface CollectionService<T extends StoreDocument> {
  /**
   * Creates a new object in the store.
   * Returns the created objects ID.
   */
  create(request: CreateData<T>): CreateResult;

  /**
   * Updates an existing object in the store.
   */
  update(id: DocumentId, request: UpdateData<T>): UpdateResult;

  /**
   * If the object already exists it updates the data, if it doesn't exist it creates it.
   */
  set(request: SetData<T>): SetResult;

  /**
   * Deletes an existing object in the store.
   */
  delete(id: DocumentId): DeleteResult;

  /**
   * Gets a document via its ID once. Does not listen for changes.
   */
  getById(id: DocumentId): GetResult<T>;

  /**
   * Gets a list of documents from the store. These are kept up to date.
   */
  getWhere(constraints: WhereConstraints): WhereResult<T>;
}

export enum FirebaseError {
  UNKNOWN = 'unknown',
  PERMISSION_DENIED = 'permission-denied',
}
