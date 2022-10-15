import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-top-bar',
  template: `
    <ui-text size="large">{{ title }}</ui-text>

    <ng-content></ng-content>
  `,
  styleUrls: ['./mobile-top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileTopBarComponent {
  @Input() title!: string;
}
