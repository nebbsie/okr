import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-google-auth-button',
  template: `
    <ui-button [loading]="loading" [fullWidth]="true" (click)="submit.emit()">
      <img
        marginRight="small"
        width="24"
        height="24"
        src="assets/google-logo.svg"
        alt="Google logo"
      />
      <ng-content></ng-content>
    </ui-button>
  `,
  styleUrls: ['./google-auth-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleAuthButtonComponent {
  @Input() loading? = false;

  @Output() submit = new EventEmitter<void>();
}
