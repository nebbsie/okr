import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {
  TextAlign,
  TextColour,
  TextComponent,
  TextSize,
  TextTransform,
  TextType,
  TextWeight,
} from '../text';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-link',
  standalone: true,
  imports: [RouterLink, TextComponent],
  template: `
    <a
      class="Link"
      [attr.data-size]="size"
      [attr.data-size-tablet]="sizeTablet"
      [attr.data-size-desktop]="sizeDesktop"
      [attr.data-font-colour]="colour"
      [attr.data-font-transform]="transform"
      [attr.data-text-display]="display"
      [attr.data-text-align]="align"
      [attr.data-font-weight]="weight"
      [attr.data-text-truncate]="truncate"
      [routerLink]="link"
    >
      <ng-content></ng-content>
    </a>
  `,
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() link!: string;

  @HostBinding('attr.data-type')
  @Input()
  type: TextType = 'paragraph';

  @Input() size: TextSize = 'mid';
  @Input() sizeTablet?: TextSize;
  @Input() sizeDesktop?: TextSize;
  @Input() colour: TextColour = 'dark';
  @Input() transform: TextTransform = 'none';
  @Input() display: 'block' | 'inline-block' = 'block';
  @Input() align?: TextAlign = 'left';
  @Input() weight: TextWeight = 'regular';
  @Input() truncate: boolean = false;
}
