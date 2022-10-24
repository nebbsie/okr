import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-recover-sent',
  template: `
    <ui-page [center]="true">
      <app-reset-email-sent class="Form"></app-reset-email-sent>
    </ui-page>
  `,
  styleUrls: ['./recover-sent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverSentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
