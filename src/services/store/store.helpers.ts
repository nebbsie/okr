import { FirebaseError } from './store.errors';
import { StoreCollection } from './config/collections';
import { FirestoreDataConverter } from '@angular/fire/firestore';
import { TransformerMap } from './config/transformers';
import {
  DocumentState,
  ErrorCode,
  ErrorRequestResult,
  StoreDocument,
} from './store.types';

export function ConvertFirebaseError(
  err: any,
  collection: string
): FirebaseError {
  console.error(err, collection);

  switch (err.code) {
    case FirebaseError.PERMISSION_DENIED:
      return FirebaseError.PERMISSION_DENIED;
    case FirebaseError.NOT_FOUND:
      return FirebaseError.NOT_FOUND;
    case FirebaseError.INVALID_ARGUMENT:
      return FirebaseError.INVALID_ARGUMENT;
    default:
      console.error(`ERROR not found. Add ${err.code} to store.errors.ts.`);
      return FirebaseError.UNKNOWN;
  }
}

export function StoreConverter<C extends StoreCollection>(
  collection: C['name']
): FirestoreDataConverter<C['type']> {
  return {
    fromFirestore(snapshot) {
      return TransformerMap[collection](snapshot.data() as any);
    },
    toFirestore(modelObject) {
      return modelObject;
    },
  };
}

export function transformStoreDocumentFields(
  data: any,
  defaultState: DocumentState = DocumentState.ACTIVE
): StoreDocument {
  if (!data.id) {
    throw new Error('Could not find id in transformer.');
  }

  if (!data.createdTime) {
    console.error('Could not find createdTime in transformer.');
  }

  return {
    id: data.id,
    createdTime: data.createdTime,
    state: defaultState,
  };
}

export function getServiceLogicError(
  msg: string,
  code: ErrorCode
): ErrorRequestResult {
  const err: ErrorRequestResult = {
    status: 'error',
    message: msg,
    code,
  };
  console.error(err);
  return err;
}

export function FirebaseMapToTypescriptMap<T>(data: any): Map<string, T> {
  let map = new Map<string, T>();
  Object.entries(data).forEach((value, index) => {
    map.set(value[0], value[1] as T);
  });
  return map;
}
