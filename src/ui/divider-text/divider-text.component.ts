import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TextComponent } from '@ui/text';

@Component({
  selector: 'ui-divider-text',
  standalone: true,
  imports: [MatDividerModule, TextComponent],
  template: `
    <mat-divider class="Item Divider"></mat-divider>
    <ui-text class="Item" align="center">
      <ng-content></ng-content>
    </ui-text>
    <mat-divider class="Item Divider"></mat-divider>
  `,
  styleUrls: ['./divider-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerTextComponent {}
