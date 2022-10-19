import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { AlertType } from '@core/ui/alert/alert.types';
import { TextColour } from '@core/ui';

@Component({
  selector: 'ui-alert',
  template: `
    <ui-icon [colour]="iconColour" marginRight="mid">
      {{ iconType }}
    </ui-icon>

    <ui-text>
      <ng-content></ng-content>
    </ui-text>
  `,
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  @HostBinding('attr.alert-type')
  @Input()
  type: AlertType = 'info';

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
