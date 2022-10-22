import { FirebaseError } from './store.errors';
import { StoreCollection } from '@core/services/store/config/collections';
import { FirestoreDataConverter } from '@angular/fire/firestore';
import { TransformerMap } from '@core/services/store/config/transformers';
import {
  DocumentState,
  ErrorCode,
  ErrorRequestResult,
  StoreDocument,
} from '@core/services/store/store.types';

export function ConvertFirebaseError(err: any): FirebaseError {
  console.error(err);

  const code = err.code as string;
  const isDefinedError = code in FirebaseError;
  if (!isDefinedError) {
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
