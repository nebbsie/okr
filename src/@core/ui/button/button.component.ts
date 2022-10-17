import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'ui-button',
  template: `
    <button
      *ngIf="type === 'normal'"
      class="Button"
      [attr.data-full-width]="fullWidth"
      [attr.data-full-width-tablet]="fullWidthTablet"
      [attr.data-full-width-desktop]="fullWidthDesktop"
      [color]="colour"
      [disabled]="disabled"
      mat-raised-button
    >
      <ng-container *ngIf="!loading">
        <ng-content></ng-content>
      </ng-container>

      <span
        *ngIf="loading"
        [class.LightStyle]="lightStyle"
        [class.DarkStyle]="!lightStyle"
      ></span>
    </button>

    <button
      *ngIf="type === 'icon'"
      mat-icon-button
      color="accent"
      aria-label="Example icon button with a menu icon"
    >
      <mat-icon>{{ icon }}</mat-icon>

      <span
        *ngIf="loading"
        [class.LightStyle]="lightStyle"
        [class.DarkStyle]="!lightStyle"
      ></span>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() colour: ThemePalette = 'primary';
  @Input() type: 'normal' | 'icon' = 'normal';

  @Input() icon?: string;

  @Input()
  @HostBinding('attr.data-full-width')
  fullWidth = false;

  @Input()
  @HostBinding('attr.data-full-width-tablet')
  fullWidthTablet = false;

  @Input()
  @HostBinding('attr.data-full-width-desktop')
  fullWidthDesktop = false;

  @Input() loading? = false;
  @Input() disabled? = false;

  lightStyle = false;

  ngOnInit() {
    this.lightStyle = this.colour === 'primary';
  }
}
