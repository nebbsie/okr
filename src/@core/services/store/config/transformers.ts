import { transformStoreDocumentFields } from '../store.helpers';
import { User } from './documents';

function TransformUser(data: any): User {
  return {
    ...transformStoreDocumentFields(data),
  };
}

export const TransformerMap = {
  users: TransformUser,
};
