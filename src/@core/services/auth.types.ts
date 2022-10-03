export type GoogleLoginErrorCode =
  | 'auth/user-not-found'
  | 'auth/wrong-password';

export type LoginResponse = {
  success: boolean;
  errorCode?: GoogleLoginErrorCode;
};
