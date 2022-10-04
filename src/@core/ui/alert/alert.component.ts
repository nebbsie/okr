import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { AlertType } from '@core/ui/alert/alert.types';

@Component({
  selector: 'ui-alert',
  template: `
    <mat-icon class="Icon" [attr.type]="iconType">
      {{ iconType }}
    </mat-icon>
    <ui-text size="small">
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

  @HostBinding('attr.data-type')
  iconType!: string;

  ngOnInit(): void {
    switch (this.type) {
      case 'error':
        this.iconType = 'error_outline';
        break;
      case 'warning':
        this.iconType = 'warning_amber';
        break;
      case 'info':
        this.iconType = 'info';
        break;
      case 'success':
        this.iconType = 'check_circle';
        break;
    }
  }
}
