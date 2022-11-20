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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { startWith, Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from '@directives/directives.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DirectivesModule,
    NgIf,
  ],
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
  @Input() icon?: string;
  @Input() submitAction?: string;
  @Input() loading?: boolean = false;

  @Output() submit = new EventEmitter();

  subscription?: Subscription;
  error?: string;
  hidePassword = true;

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
