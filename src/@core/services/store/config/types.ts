// Users
export interface MinimalUser {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
}

// Enterprises
export interface MinimalEnterprise {
  readonly id: string;
  readonly name: string;
  readonly avatar: string;
}

// Enterprises
export enum EnterpriseRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}
