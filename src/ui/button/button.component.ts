import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TextColour } from '@ui/text';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [MatButtonModule, NgTemplateOutlet, MatIconModule, NgIf],
  template: `
    <button
      *ngIf="type === 'normal'"
      class="Button"
      [attr.data-full-width]="fullWidth"
      [attr.data-full-width-tablet]="fullWidthTablet"
      [attr.data-full-width-desktop]="fullWidthDesktop"
      [attr.data-background-colour]="colour"
      [attr.data-tall]="tall"
      [disabled]="disabled || loading"
      mat-flat-button
    >
      <ng-container *ngIf="!loading">
        <ng-container [ngTemplateOutlet]="content"></ng-container>
      </ng-container>

      <span *ngIf="loading" class="Loading"></span>
    </button>

    <button
      *ngIf="type === 'stroked'"
      class="Button"
      [attr.data-full-width]="fullWidth"
      [attr.data-full-width-tablet]="fullWidthTablet"
      [attr.data-full-width-desktop]="fullWidthDesktop"
      [attr.data-background-colour]="colour"
      [attr.data-tall]="tall"
      [disabled]="disabled || loading"
      mat-stroked-button
    >
      <ng-container *ngIf="!loading">
        <ng-container [ngTemplateOutlet]="content"></ng-container>
      </ng-container>

      <span *ngIf="loading"></span>
    </button>

    <button
      *ngIf="type === 'icon'"
      mat-icon-button
      [attr.data-background-colour]="colour"
    >
      <mat-icon>{{ icon }}</mat-icon>

      <span *ngIf="loading" class="Loading"></span>
    </button>

    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type: 'normal' | 'icon' | 'stroked' = 'normal';
  @Input() icon?: string;
  @Input() loading? = false;
  @Input() disabled? = false;
  @Input() tall = false;

  @Input()
  @HostBinding('attr.data-full-width')
  fullWidth?: boolean;

  @Input()
  @HostBinding('attr.data-full-width-tablet')
  fullWidthTablet?: boolean;

  @Input()
  @HostBinding('attr.data-full-width-desktop')
  fullWidthDesktop?: boolean;

  @Input() colour: TextColour | 'transparent' = 'transparent';
}
