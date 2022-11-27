import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { MinimalTeam } from '@services/store';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
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
      (click)="menuTrigger.openMenu()"
    >
      <ui-text weight="medium">{{ teamName$ | Async }}</ui-text>
      <ui-icon
        #menuTrigger="matMenuTrigger"
        [matMenuTriggerFor]="teamSelectActions"
        [clickable]="true"
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

          <div
            *ngFor="
              let team of unselectedTeams;
              let isLast = last;
              trackBy: trackById
            "
            mat-menu-item
            [marginBottom]="isLast ? 'none' : 'xxsmall'"
            (click)="handleSelectTeam(team.id)"
          >
            <ui-text>{{ team.name }}</ui-text>
          </div>
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
    private teams: TeamsService,
    private users: UsersService,
    private modal: ModalService,
    private router: Router
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
    this.modal.open(CreateTeamModalComponent, {}).then((teamId) => {
      if (!teamId) {
        return;
      }

      this.handleSelectTeam(teamId);

      this.router.navigate(['/']);
    });
  }

  handleSelectTeam(teamId: string) {
    this.localStorage.set('selectedTeam', teamId);
    this.router.navigate([`/team/${teamId}`]);
  }
}
