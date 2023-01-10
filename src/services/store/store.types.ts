import { QueryConstraint } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseError } from './store.errors';
import { StoreCollection } from './config/collections';

export type OmittedStoreObjectParams = keyof StoreDocument;

export type UpdateData<C extends StoreCollection> = DualParam<
  Omit<Partial<C['type']>, 'id'>
>;

export type WhereConstraints = DualParam<QueryConstraint[]>;

export type SetData<C extends StoreCollection> = DualParam<
  Omit<C['type'], OmittedStoreObjectParams> & { id: string }
>;

export type CreateData<C extends StoreCollection> = DualParam<
  Omit<C['type'], OmittedStoreObjectParams>
>;

export type DocumentId = DualParam<string | undefined>;

export interface StoreDocument {
  readonly id: string;
  readonly createdTime: ServerTimestamp;
  readonly state: DocumentState;
}

export interface ServerTimestamp {
  readonly seconds: number;
  readonly nanoseconds: number;
}

export type DualParam<T> = T | Observable<T>;

export type UntypedUpdateData = { [field: string]: any };

export type UntypedCreateData = {
  readonly [field: string]: any;
  readonly createdTime: any;
  readonly id: string;
};

export type StoreResult<
  T extends StoreDocument | StoreDocument[] | string | void
> = {
  readonly loading$: Observable<boolean>;
  readonly error$: Observable<FirebaseError | undefined>;
  readonly value$: Observable<T | undefined>;
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

export type SuccessCreateResult = {
  readonly status: 'success';
  readonly id: string;
};

export type ErrorRequestResult = {
  readonly status: 'error';
  readonly message: string;
  readonly code: ErrorCode;
};

export type RequestResult = ErrorRequestResult | SuccessCreateResult;

export const enum ErrorCode {
  WORKSPACE_NOT_FOUND,
  TEAM_NOT_FOUND,
  CREATE_FAILED,
  USER_NOT_FOUND,
  BOARD_NOT_FOUND,
}

export const enum DocumentState {
  ACTIVE = 'active',
  REMOVED = 'removed',
}
