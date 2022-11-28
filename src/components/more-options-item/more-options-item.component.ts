import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '@ui/icon';
import { TextComponent } from '@ui/text';

@Component({
  selector: 'app-more-options-item',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, IconComponent, TextComponent],
  template: `
    <button class="Button" mat-menu-item>
      <ui-icon colour="grey">{{ icon }}</ui-icon>
      <ui-text>
        <ng-content></ng-content>
      </ui-text>
    </button>
  `,
  styleUrls: ['./more-options-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreOptionsItemComponent {
  @Input() icon!: string;
}
