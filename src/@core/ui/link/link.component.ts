import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextAlign, TextSize } from '@core/ui/text/text.types';

@Component({
  selector: 'ui-link',
  template: `
    <a [routerLink]="link">
      <ui-text [size]="size" [align]="align">
        <ng-content></ng-content>
      </ui-text>
    </a>
  `,
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() link!: string;

  @Input()
  size: TextSize = 'mid';

  @Input()
  align?: TextAlign;
}
