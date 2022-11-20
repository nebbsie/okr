import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextColour, TextSize } from '../index';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-icon',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  template: `
    <mat-icon
      class="Icon"
      aria-hidden="false"
      [routerLink]="link"
      [class.Icon-Link]="!!link"
      [attr.data-font-colour]="colour"
      [attr.data-size]="size"
      [attr.data-size-tablet]="sizeTablet"
      [attr.data-size-desktop]="sizeDesktop"
    >
      <ng-content></ng-content>
    </mat-icon>
  `,
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() link?: string;
  @Input() colour: TextColour = 'dark';
  @Input() size: TextSize = 'xlarge';
  @Input() sizeTablet?: TextSize;
  @Input() sizeDesktop?: TextSize;
}
