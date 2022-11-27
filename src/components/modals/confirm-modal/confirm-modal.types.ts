import { Observable } from 'rxjs';

export enum ConfirmationModalType {
  WARNING = 'warning',
  NORMAL = 'normal',
}

export type ConfirmationModalInput = {
  readonly type?: ConfirmationModalType;
  readonly message: string;
  readonly action?: () => Observable<any>;
};
