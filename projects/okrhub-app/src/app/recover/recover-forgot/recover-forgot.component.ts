import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-forgot',
  template: `
    <ui-page direction="row" justify="center">
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
