import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-board-home',
  template: ` <app-objective-create-form></app-objective-create-form> `,
  styleUrls: ['./board-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardHomeComponent {}
