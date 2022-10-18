import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ui-input',
  template: `
    <mat-form-field class="Input" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <input
        [type]="
          type === 'password' ? (hidePassword ? 'password' : 'text') : type
        "
        [formControl]="control"
        matInput
      />

      <mat-icon *ngIf="icon" matSuffix>{{ icon }}</mat-icon>

      <button
        *ngIf="type === 'password'"
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

      <button
        *ngIf="submitAction"
        mat-icon-button
        matSuffix
        (click)="submit.emit()"
      >
        <mat-icon>{{ submitAction }}</mat-icon>
      </button>

      <mat-hint *ngIf="hint" marginBottom="mid">{{ hint }}</mat-hint>

      <mat-error *ngIf="error">{{ error }}</mat-error>
    </mat-form-field>
  `,
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() label!: string;
  @Input() hint?: string;
  @Input() type!: 'text' | 'password' | 'email';
  @Input() control!: FormControl;

  hidePassword = true;

  @Input() icon?: string;
  @Input() submitAction?: string;

  @Output() submit = new EventEmitter();

  subscription?: Subscription;
  error?: string;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscription = this.control.valueChanges.subscribe(() => {
      [this.error] = Object.values(this.control.errors || {});
      this.ref.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
