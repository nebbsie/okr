import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextAlign, TextColour, TextComponent, TextSize } from '../text';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-link',
  standalone: true,
  imports: [RouterLink, TextComponent],
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
  @Input() size: TextSize = 'mid';
  @Input() align?: TextAlign;
  @Input() colour: TextColour = 'grey';
}
