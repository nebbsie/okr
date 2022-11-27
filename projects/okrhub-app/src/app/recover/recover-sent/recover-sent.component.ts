import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-recover-sent',
  template: `
    <ui-page direction="row" justify="center">
      <app-reset-email-sent class="Form"></app-reset-email-sent>
    </ui-page>
  `,
  styleUrls: ['./recover-sent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverSentComponent {}
