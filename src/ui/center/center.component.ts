import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { AlignItems, FlexDirection, JustifyContent } from '../flex/flex.types';

@Component({
  selector: 'ui-center',
  template: `
    <div
      class="Center"
      [attr.data-flex-direction]="direction"
      [attr.data-flex-direction-tablet]="directionTablet"
      [attr.data-flex-direction-desktop]="directionDesktop"
      [attr.data-flex-justify]="justify"
      [attr.data-flex-justify-tablet]="justifyTablet"
      [attr.data-flex-justify-desktop]="justifyDesktop"
      [attr.data-flex-align]="align"
      [attr.data-flex-align-tablet]="alignTablet"
      [attr.data-flex-align-desktop]="alignDesktop"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CenterComponent {
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
  justifyDesktop?: JustifyContent;

  @Input()
  align?: AlignItems;

  @Input()
  alignTablet?: AlignItems;

  @Input()
  alignDesktop?: AlignItems;
}
