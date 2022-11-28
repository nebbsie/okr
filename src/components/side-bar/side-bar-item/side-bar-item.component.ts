import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar-item',
  template: `
    <ui-flex
      class="Item"
      align="center"
      routerLinkActive="Active"
      #item="routerLinkActive"
      [routerLink]="link"
      [routerLinkActiveOptions]="{ exact: exactLink }"
    >
      <ui-icon
        *ngIf="icon"
        [colour]="item.isActive ? 'dark' : 'grey'"
        marginRight="xxsmall"
        size="large"
      >
        {{ icon }}
      </ui-icon>

      <ui-text size="small">
        <ng-content></ng-content>
      </ui-text>
    </ui-flex>
  `,
  styleUrls: ['./side-bar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarItemComponent {
  @Input() icon?: string;
  @Input() link?: string;
  @Input() exactLink = true;
}
