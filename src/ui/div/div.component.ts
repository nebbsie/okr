import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-div',
  standalone: true,
  imports: [],
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./div.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DivComponent {}
