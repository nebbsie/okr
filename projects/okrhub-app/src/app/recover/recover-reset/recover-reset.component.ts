import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recover-reset',
  template: `
    <ui-page [center]="true">
      <app-reset-password class="Form"></app-reset-password>
    </ui-page>
  `,
  styleUrls: ['./recover-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverResetComponent {}
