import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-divider-text',
  template: `
    <mat-divider class="Item"></mat-divider>
    <ui-text class="Item" align="center"> <ng-content></ng-content> </ui-text>
    <mat-divider class="Item"></mat-divider>
  `,
  styleUrls: ['./divider-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerTextComponent {}
