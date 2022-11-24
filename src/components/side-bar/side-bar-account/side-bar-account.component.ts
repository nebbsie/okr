import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, firstValueFrom, map, Observable } from 'rxjs';
import { AuthService } from '@services/auth';
import { UsersService } from '@services/collections/users';
import { isDefined } from '@utils/utils';
import { Router } from '@angular/router';
import { Store, Team, Workspace, WorkspacesCollection } from '@services/store';
import { TeamsService } from '@services/collections/teams';

@Component({
  selector: 'app-side-bar-account',
  template: `
    <ui-flex
      class="Trigger"
      align="center"
      [matMenuTriggerFor]="accountSettings"
      (menuOpened)="expanded = true"
      (menuClosed)="expanded = false"
    >
      <ui-avatar [userId$]="userId$" size="mid"></ui-avatar>
      <ui-icon colour="mid" size="mid">
        {{ expanded ? 'expand_less' : 'expand_more' }}
      </ui-icon>
    </ui-flex>

    <mat-menu #accountSettings="matMenu">
      <ui-flex class="AccountSettingsMenu" direction="column">
        <ui-flex align="center" marginBottom="mid">
          <ui-avatar
            size="small"
            marginRight="xxsmall"
            [userId$]="userId$"
          ></ui-avatar>

          <ui-link link="/profile">{{ name$ | Async }}</ui-link>
        </ui-flex>

        <ui-text
          colour="mid"
          marginBottom="xxsmall"
          size="small"
          transform="uppercase"
          weight="medium"
        >
          Settings
        </ui-text>

        <ui-link link="/settings" marginBottom="xxsmall"> Profile </ui-link>

        <ui-link link="/settings/notifications" marginBottom="mid">
          Notifications
        </ui-link>

        <ui-text
          colour="mid"
          marginBottom="xxsmall"
          size="small"
          transform="uppercase"
          weight="medium"
        >
          Workspaces
        </ui-text>

        <ui-text [clickable]="true" marginBottom="mid">
          Switch workspace
        </ui-text>

        <ui-text
          colour="mid"
          marginBottom="xxsmall"
          size="small"
          transform="uppercase"
          weight="medium"
        >
          Teams
        </ui-text>

        <ng-container *ngIf="teams$ | Async as teams">
          <ui-link
            *ngFor="let team of teams | slice: 0:3; let last = last"
            [link]="'/team/' + team.id"
            [marginBottom]="last && teams.length <= 3 ? 'mid' : 'xsmall'"
          >
            {{ team.name }}
          </ui-link>

          <ui-link
            *ngIf="teams.length > 3"
            link="/profile/teams"
            marginBottom="mid"
          >
            See more...
          </ui-link>
        </ng-container>

        <ui-text
          colour="mid"
          marginBottom="xxsmall"
          size="small"
          transform="uppercase"
          weight="medium"
        >
          Actions
        </ui-text>

        <ui-link link="/upgrade" marginBottom="xsmall"> Upgrade </ui-link>

        <ui-text [clickable]="true" colour="danger" (click)="logout()">
          Log Out
        </ui-text>
      </ui-flex>
    </mat-menu>
  `,
  styleUrls: ['./side-bar-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarAccountComponent implements OnInit {
  userId$!: Observable<string>;
  name$!: Observable<string>;
  currentWorkspace$!: Observable<Workspace>;
  teams$!: Observable<Team[]>;

  expanded = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store,
    private teams: TeamsService,
    private users: UsersService
  ) {}

  ngOnInit(): void {
    this.teams$ = this.teams.getCurrentUsersTeams();

    this.userId$ = this.auth.getUserId();

    const currentUserResult = this.users.getCurrentUser();

    const user$ = currentUserResult.value$.pipe(filter(isDefined));

    this.name$ = user$.pipe(map((user) => user.fullName));

    const currentWorkspaceId$ = 'Hw5KM4Vfg6n7RljQmGz2';

    const currentWorkspaceResult = this.store.get<WorkspacesCollection>(
      'workspaces',
      currentWorkspaceId$
    );

    this.currentWorkspace$ = currentWorkspaceResult.value$.pipe(
      filter(isDefined)
    );
  }

  async logout() {
    await firstValueFrom(this.auth.logout());
    await this.router.navigate(['/login']);
  }
}
