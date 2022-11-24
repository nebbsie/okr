import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextComponent } from '@ui/text';
import { NgForOf, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'ui-page',
  standalone: true,
  imports: [TextComponent, NgIf, MatTabsModule, NgForOf],
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
  @Input() title?: string;
  @Input() center?: boolean = false;
  @Input() contentDirection?: 'row' | 'column' = 'column';

  @Input() links?: string[];

  activeLink?: string;
}
