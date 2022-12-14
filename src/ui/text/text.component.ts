import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  TextAlign,
  TextColour,
  TextSize,
  TextTransform,
  TextType,
  TextWeight,
} from './text.types';

@Component({
  selector: 'ui-text',
  standalone: true,
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnChanges {
  @HostBinding('attr.data-type')
  @Input()
  type: TextType = 'paragraph';

  @HostBinding('attr.data-clickable')
  @Input()
  clickable = false;

  @HostBinding('attr.data-unselectable')
  @Input()
  unselectable = false;

  @HostBinding('attr.role') role: string | null | undefined;

  @Input()
  @HostBinding('attr.data-size')
  size: TextSize = 'mid';

  @Input()
  @HostBinding('attr.data-size-tablet')
  sizeTablet?: TextSize;

  @Input()
  @HostBinding('attr.data-size-desktop')
  sizeDesktop?: TextSize;

  @Input()
  @HostBinding('attr.data-font-colour')
  colour: TextColour = 'dark';

  @Input()
  @HostBinding('attr.data-font-transform')
  transform: TextTransform = 'none';

  @HostBinding('attr.data-text-display')
  @Input()
  display: 'block' | 'inline-block' = 'block';

  @HostBinding('attr.data-text-align')
  @Input()
  align?: TextAlign = 'left';

  @Input()
  @HostBinding('attr.data-font-weight')
  weight: TextWeight = 'regular';

  @Input()
  @HostBinding('attr.data-text-truncate')
  truncate: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if ('type' in changes) {
      this.role = this.type;
    }
  }
}
