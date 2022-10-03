import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: `[hideMobile], [hideTablet], [hideDesktop]`,
})
export class HideDirective {
  @HostBinding('class.HideMobile')
  @Input()
  hideMobile?: boolean;

  @HostBinding('class.HideTablet')
  @Input()
  hideTablet?: boolean;

  @HostBinding('class.HideDesktop')
  @Input()
  hideDesktop?: boolean;
}
