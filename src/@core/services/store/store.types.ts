import { QueryConstraint } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseError } from './store.errors';
import { StoreCollection } from './config/collections';

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

export type StoreResult<
  T extends StoreDocument | StoreDocument[] | string | void
> = {
  readonly loading$: Observable<boolean>;
  readonly error$: Observable<FirebaseError>;
  readonly result$: Observable<T>;
};

export type CreateResult<C extends StoreCollection> = StoreResult<string>;

export type DeleteResult<C extends StoreCollection> = StoreResult<void>;

export type SetResult<C extends StoreCollection> = StoreResult<void>;

export type UpdateResult<C extends StoreCollection> = StoreResult<void>;

export type WhereResult<C extends StoreCollection> = StoreResult<C['type'][]>;

export type GetResult<C extends StoreCollection> = StoreResult<
  C['type'] | undefined
>;

export type ListenResult<C extends StoreCollection> = StoreResult<
  C['type'] | undefined
>;

export type SuccessRequestResult = {
  readonly status: 'success';
};

export type ErrorRequestResult = {
  readonly status: 'error';
  readonly message: string;
  readonly code: ErrorCode;
};

export type RequestResult = SuccessRequestResult | ErrorRequestResult;

export enum ErrorCode {
  ENTERPRISE_NOT_FOUND,
  TEAM_NOT_FOUND,
}
