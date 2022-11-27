import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-side-bar-team-nav',
  template: `
    <ui-text class="Title" weight="medium">Team</ui-text>
    <app-side-bar-item
      routerLinkActive="SideBarActive"
      icon="dashboard"
      [routerLink]="'/team/' + currentTeamId"
      [routerLinkActiveOptions]="{ exact: true }"
    >
      Dashboard
    </app-side-bar-item>

    <app-side-bar-item
      routerLinkActive="SideBarActive"
      icon="groups"
      [routerLink]="'/team/' + currentTeamId + '/members'"
      [routerLinkActiveOptions]="{ exact: true }"
    >
      Members
    </app-side-bar-item>

    <app-side-bar-item
      routerLinkActive="SideBarActive"
      icon="settings"
      [routerLink]="'/team/' + currentTeamId + '/settings'"
      [routerLinkActiveOptions]="{ exact: true }"
    >
      Settings
    </app-side-bar-item>
  `,
  styleUrls: ['./side-bar-team-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarTeamNavComponent {
  @HostBinding('attr.data-border-top')
  @Input()
  borderTop? = false;

  @HostBinding('attr.data-border-bottom')
  @Input()
  borderBottom? = false;

  @Input() currentTeamId?: string;
}
