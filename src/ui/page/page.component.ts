import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { ContentDirection } from './page.types';

@Component({
  selector: 'ui-page',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  @Input()
  @HostBinding('attr.data-center-content')
  center?: boolean = false;

  @Input()
  @HostBinding('attr.data-flex-direction')
  contentDirection?: ContentDirection = 'column';
}
