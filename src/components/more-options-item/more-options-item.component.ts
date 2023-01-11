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
    <button mat-menu-item>
      <mat-icon>{{ icon }}</mat-icon>
      <span>{{ title }}</span>
    </button>
  `,
  styleUrls: ['./more-options-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreOptionsItemComponent {
  @Input() icon!: string;
  @Input() title!: string;
}
