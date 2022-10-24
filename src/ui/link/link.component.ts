import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextAlign, TextColour, TextSize } from '../text';

@Component({
  selector: 'ui-link',
  template: `
    <a class="Link" [routerLink]="link">
      <ui-text [colour]="colour" [size]="size" [align]="align">
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

  @Input()
  colour: TextColour = 'grey';
}
