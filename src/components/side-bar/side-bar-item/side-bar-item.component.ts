import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-side-bar-item',
  template: `
    <ui-text>
      <ng-content></ng-content>
    </ui-text>
  `,
  styleUrls: ['./side-bar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarItemComponent {
  @HostBinding('attr.data-top-border')
  @Input()
  topBorder = false;

  @HostBinding('attr.data-bottom-border')
  @Input()
  bottomBorder = false;
}
