import { transformStoreDocumentFields } from '../store.helpers';
import { Enterprise, EnterpriseUser, User } from './documents';

function TransformUser(data: any): User {
  return {
    ...transformStoreDocumentFields(data),
  };
}

function TransformEnterprise(data: any): Enterprise {
  return {
    name: data.name,
    creatorId: data.createdTime,
    ...transformStoreDocumentFields(data),
  };
}

function TransformEnterpriseUser(data: any): EnterpriseUser {
  return {
    userId: data.userId,
    role: data.role,
    ...transformStoreDocumentFields(data),
  };
}

export const TransformerMap = {
  users: TransformUser,
  enterprises: TransformEnterprise,
  enterpriseUsers: TransformEnterpriseUser,
};
