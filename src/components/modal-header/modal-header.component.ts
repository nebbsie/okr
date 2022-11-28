import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { IconComponent } from '@ui/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-modal-header',
  standalone: true,
  imports: [IconComponent, MatTooltipModule],
  template: `
    <ng-content></ng-content>

    <ui-icon
      matTooltip="Close"
      colour="grey"
      [clickable]="true"
      (click)="close.emit()"
    >
      close
    </ui-icon>
  `,
  styleUrls: ['./modal-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalHeaderComponent {
  @Output() close = new EventEmitter<undefined>();
}
