import { FirestoreDataConverter } from '@angular/fire/firestore';
import { transformStoreDocumentFields } from '@core/services/store';
import { User } from './users.types';

export function transformUser(data: any): User {
  return {
    ...transformStoreDocumentFields(data),
  };
}

export function UsersConverter(): FirestoreDataConverter<User> {
  return {
    fromFirestore(snapshot) {
      return transformUser(snapshot.data() as any);
    },
    toFirestore(modelObject) {
      return modelObject;
    },
  };
}
