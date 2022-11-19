import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContentDirection } from './page.types';

@Component({
  selector: 'ui-page',
  template: `
    <div class="PageTitle" *ngIf="title">
      <ui-text>{{ title }}</ui-text>
    </div>

    <div
      class="PageContainer"
      [attr.data-center-content]="center"
      [attr.data-flex-direction]="contentDirection"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  @Input() title!: string;

  @Input()
  center?: boolean = false;

  @Input()
  contentDirection?: ContentDirection = 'column';
}