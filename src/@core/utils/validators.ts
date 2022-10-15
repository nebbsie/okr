import { AbstractControl, ValidatorFn } from '@angular/forms';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

export const required =
  (errorText: string): ValidatorFn =>
  (control: AbstractControl): { [key: string]: any } | null =>
    control.value ? null : { REQUIRED_ERROR: errorText };

export const matches =
  (compareString: string, errorText: string): ValidatorFn =>
  (control: AbstractControl): { [key: string]: any } | null =>
    control.value && control.value === compareString
      ? null
      : { REQUIRED_ERROR: errorText };

export const isEmail =
  (errorText: string): ValidatorFn =>
  (control: AbstractControl): { [key: string]: any } | null =>
    control.value &&
    typeof control.value === 'string' &&
    control.value.includes('@') &&
    control.value.includes('.')
      ? null
      : { EMAIL_ERROR: errorText };

export const minStringLength =
  (minLength: number, errorText: string): ValidatorFn =>
  (control: AbstractControl): { [key: string]: any } | null =>
    control.value &&
    typeof control.value === 'string' &&
    control.value.length > minLength
      ? null
      : { MIN_LENGTH_ERROR: errorText };

export const maxStringLength =
  (maxLength: number, errorText: string): ValidatorFn =>
  (control: AbstractControl): { [key: string]: any } | null =>
    control.value &&
    typeof control.value === 'string' &&
    control.value.length <= maxLength
      ? null
      : { MAX_LENGTH_ERROR: errorText };

export const isValidPassword =
  (errorText: string): ValidatorFn =>
  (control: AbstractControl): { [key: string]: any } | null =>
    control.value &&
    typeof control.value === 'string' &&
    control.value.match(PASSWORD_REGEX)
      ? null
      : { PASSWORD_ERROR: errorText };
