import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { MinimalTeam } from '@services/store';
import { LocalStorageService } from '@services/local-storage';
import { isDefined } from '@utils/utils';
import { TeamsService } from '@services/collections/teams';
import { UsersService } from '@services/collections/users';
import { ModalService } from '@services/modal';
import { CreateTeamModalComponent } from '@components/modals/create-team-modal';
import { trackById } from '@services/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-team-select',
  template: `
    <ui-flex
      class="TeamSelectTrigger"
      align="center"
      justify="space-between"
      [fullWidth]="true"
      (click)="menuTrigger.openMenu()"
    >
      <ui-text weight="medium">{{ teamName$ | Async }}</ui-text>
      <ui-icon
        #menuTrigger="matMenuTrigger"
        [matMenuTriggerFor]="teamSelectActions"
      >
        unfold_more
      </ui-icon>
    </ui-flex>

    <mat-menu xPosition="before" #teamSelectActions="matMenu">
      <ng-container *ngIf="unselectedTeams$ | Async as unselectedTeams">
        <ui-flex class="MatMenuHeader" align="center" justify="space-between">
          <ui-text weight="medium" marginRight="small"> Teams </ui-text>
          <ui-icon
            matTooltip="Create team"
            colour="grey"
            [clickable]="true"
            (click)="handleCreateTeam()"
          >
            add
          </ui-icon>
        </ui-flex>

        <div
          class="TeamSelectList"
          [class.Empty]="unselectedTeams.length === 0"
        >
          <ui-alert
            *ngIf="unselectedTeams.length === 0"
            class="EmptyTeams"
            padding="xsmall"
            textSize="xsmall"
          >
            You are only part of 1 team.
          </ui-alert>

          <button
            *ngFor="let team of unselectedTeams; trackBy: trackById"
            mat-menu-item
            (click)="handleSelectTeam(team.id)"
          >
            <span>{{ team.name }}</span>
          </button>
        </div>
      </ng-container>
    </mat-menu>
  `,
  styleUrls: ['./side-bar-team-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarTeamSelectComponent implements OnInit {
  trackById = trackById;

  selectedTeam$!: Observable<MinimalTeam>;
  teamName$!: Observable<string>;
  unselectedTeams$!: Observable<MinimalTeam[]>;

  constructor(
    private localStorage: LocalStorageService,
    private modal: ModalService,
    private router: Router,
    private teams: TeamsService,
    private users: UsersService
  ) {}

  ngOnInit(): void {
    const selectedTeamId$ = this.localStorage
      .get('selectedTeam')
      .pipe(filter(isDefined));

    const currentUserResult$ = this.users.listenCurrentUser();
    const user$ = currentUserResult$.value$;

    this.selectedTeam$ = combineLatest([user$, selectedTeamId$]).pipe(
      map(([user, selectedTeamId]) => user?.joinedTeams.get(selectedTeamId)),
      filter(isDefined)
    );

    this.unselectedTeams$ = combineLatest([user$, selectedTeamId$]).pipe(
      map(([user, selectedTeamId]) =>
        Array.from(user?.joinedTeams.values() ?? []).filter(
          (team) => team.id !== selectedTeamId
        )
      )
    );

    this.teamName$ = this.selectedTeam$.pipe(map((team) => team.name));
  }

  handleCreateTeam(): void {
    this.modal.open(CreateTeamModalComponent, {}).then(async (teamId) => {
      if (!teamId) {
        return;
      }

      await this.handleSelectTeam(teamId);
    });
  }

  async handleSelectTeam(teamId: string) {
    this.localStorage.set('selectedTeam', teamId);
    await this.router.navigate([`/team/${teamId}`]);
  }
}
