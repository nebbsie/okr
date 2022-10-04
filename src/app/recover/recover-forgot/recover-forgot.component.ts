import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-forgot',
  template: `
    <ui-page [center]="true">
      <app-forgot-password class="Form"></app-forgot-password>
    </ui-page>
  `,
  styleUrls: ['./recover-forgot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverForgotComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
