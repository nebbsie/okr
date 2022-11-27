import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recover-reset',
  template: `
    <ui-page direction="row" justify="center">
      <app-reset-password class="Form"></app-reset-password>
    </ui-page>
  `,
  styleUrls: ['./recover-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverResetComponent {}
