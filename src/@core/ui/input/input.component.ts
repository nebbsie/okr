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
import { startWith, Subscription } from 'rxjs';

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
        [disabled]="disabled ?? false"
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
        *ngIf="submitAction && !loading"
        mat-icon-button
        matSuffix
        (click)="handleSubmit($event)"
      >
        <mat-icon>{{ submitAction }}</mat-icon>
      </button>

      <span *ngIf="loading" class="Loading" matSuffix> </span>

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
  @Input() disabled?: boolean = false;

  hidePassword = true;

  @Input() icon?: string;

  @Input() submitAction?: string;
  @Input() loading?: boolean = false;

  @Output() submit = new EventEmitter();

  subscription?: Subscription;
  error?: string;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscription = this.control.valueChanges
      .pipe(startWith(undefined))
      .subscribe(() => {
        [this.error] = Object.values(this.control.errors || {});
        this.ref.markForCheck();
      });
  }

  handleSubmit(event: MouseEvent): void {
    event?.stopPropagation();
    this.submit.emit();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
