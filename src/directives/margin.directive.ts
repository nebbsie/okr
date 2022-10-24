import { Directive, Input, HostBinding } from '@angular/core';

export type Margin =
  | 'none'
  | 'xxxsmall'
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'mid'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxxlarge'
  | 'xxxxlarge';

@Directive({
  selector: `
     [marginRight],
     [marginBottom],

     [marginRightTablet],
     [marginBottomTablet],

     [marginRightDesktop],
     [marginBottomDesktop]
    `,
})
export class MarginDirective {
  @HostBinding('attr.data-margin-right')
  @Input()
  marginRight?: Margin;

  @HostBinding('attr.data-margin-bottom')
  @Input()
  marginBottom?: Margin;

  @HostBinding('attr.data-margin-right-tablet')
  @Input()
  marginRightTablet?: Margin;

  @HostBinding('attr.data-margin-bottom-tablet')
  @Input()
  marginBottomTablet?: Margin;

  @HostBinding('attr.data-margin-right-desktop')
  @Input()
  marginRightDesktop?: Margin;

  @HostBinding('attr.data-margin-bottom-desktop')
  @Input()
  marginBottomDesktop?: Margin;
}
