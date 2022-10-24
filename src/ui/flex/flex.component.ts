import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { AlignItems, FlexDirection, JustifyContent } from './flex.types';

@Component({
  selector: 'ui-flex',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./flex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexComponent {
  @Input()
  @HostBinding('attr.data-center')
  center?: boolean;

  @Input()
  @HostBinding('attr.data-flex-direction')
  direction?: FlexDirection;

  @Input()
  @HostBinding('attr.data-flex-direction-tablet')
  directionTablet?: FlexDirection;

  @Input()
  @HostBinding('attr.data-flex-direction-desktop')
  directionDesktop?: FlexDirection;

  @Input()
  @HostBinding('attr.data-flex-justify')
  justify?: JustifyContent;

  @Input()
  @HostBinding('attr.data-flex-justify-tablet')
  justifyTablet?: JustifyContent;

  @Input()
  @HostBinding('attr.data-flex-justify-desktop')
  justifyDesktop?: JustifyContent;

  @Input()
  @HostBinding('attr.data-flex-align')
  align?: AlignItems;

  @Input()
  @HostBinding('attr.data-flex-align-tablet')
  alignTablet?: AlignItems;

  @Input()
  @HostBinding('attr.data-flex-align-desktop')
  alignDesktop?: AlignItems;
}
