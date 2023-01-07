import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@ui/icon';
import { FlexComponent } from '@ui/flex';

@Component({
  selector: 'app-key-result-item-drop-area',
  standalone: true,
  imports: [IconComponent, FlexComponent],
  template: ``,
  styleUrls: ['./key-result-item-drop-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyResultItemDropAreaComponent {}
