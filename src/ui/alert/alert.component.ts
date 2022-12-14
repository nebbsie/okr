import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { TextColour, TextComponent, TextSize } from '../text';
import { DirectivesModule } from '@directives/directives.module';
import { IconComponent } from '@ui/icon';

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [DirectivesModule, TextComponent, IconComponent],
  template: `
    <ui-icon
      [colour]="iconColour"
      [marginRight]="
        padding === 'xsmall' || padding === 'small' ? 'xxsmall' : 'mid'
      "
    >
      {{ iconType }}
    </ui-icon>

    <ui-text [size]="textSize">
      <ng-content></ng-content>
    </ui-text>
  `,
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  @HostBinding('attr.alert-type')
  @Input()
  type: 'warning' | 'info' | 'success' | 'error' = 'info';

  @HostBinding('attr.padding')
  @Input()
  padding: 'xsmall' | 'small' | 'mid' = 'mid';

  @Input() textSize: TextSize = 'mid';

  iconType!: string;
  iconColour!: TextColour;

  ngOnInit(): void {
    switch (this.type) {
      case 'error':
        this.iconType = 'error_outline';
        this.iconColour = 'danger';
        break;
      case 'warning':
        this.iconType = 'warning_amber';
        this.iconColour = 'warning';
        break;
      case 'info':
        this.iconType = 'info';
        this.iconColour = 'info';
        break;
      case 'success':
        this.iconType = 'check_circle';
        this.iconColour = 'success';
        break;
    }
  }
}
