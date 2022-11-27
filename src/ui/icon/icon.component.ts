import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextColour, TextSize } from '../text';
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
      [attr.data-font-colour]="colour"
      [attr.data-size-desktop]="sizeDesktop"
      [attr.data-size-tablet]="sizeTablet"
      [attr.data-size]="size"
      [class.Icon-Link]="!!link || clickable"
      [routerLink]="link"
    >
      <ng-content></ng-content>
    </mat-icon>
  `,
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() clickable: boolean = false;
  @Input() colour: TextColour = 'dark';
  @Input() link?: string;
  @Input() size: TextSize = 'xlarge';
  @Input() sizeDesktop?: TextSize;
  @Input() sizeTablet?: TextSize;
}
