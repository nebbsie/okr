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

    <app-side-bar-item icon="dashboard" [link]="'/team/' + currentTeamId">
      Dashboard
    </app-side-bar-item>

    <app-side-bar-item
      icon="groups"
      [link]="'/team/' + currentTeamId + '/members'"
    >
      Members
    </app-side-bar-item>

    <app-side-bar-item
      icon="settings"
      [link]="'/team/' + currentTeamId + '/settings'"
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
