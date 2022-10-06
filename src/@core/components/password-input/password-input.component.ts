import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  template: `
    <mat-form-field class="PasswordInput" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <input
        [type]="hidePassword ? 'password' : 'text'"
        [formControl]="control"
        matInput
      />
      <button
        mat-icon-button
        matSuffix
        (click)="hidePassword = !hidePassword"
        [attr.aria-label]="'Hide password'"
        [attr.aria-pressed]="hidePassword"
      >
        <mat-icon>
          {{ hidePassword ? 'visibility_off' : 'visibility' }}
        </mat-icon>
      </button>
    </mat-form-field>
  `,
  styleUrls: ['./password-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label?: string;

  hidePassword = true;

  constructor() {}

  ngOnInit(): void {}
}
