import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { MinimalTeam } from '@services/store';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { isDefined } from '@utils/utils';
import { TeamsService } from '@services/collections/teams';
import { UsersService } from '@services/collections/users';
import { ModalService } from '@services/modal';
import { CreateTeamModalComponent } from '@components/modals/create-team-modal';

@Component({
  selector: 'app-side-bar-team-select',
  template: `
    <ui-flex
      class="TeamSelectTrigger"
      align="center"
      justify="space-between"
      [matMenuTriggerFor]="teamSelectActions"
    >
      <ui-text>{{ teamName$ | Async }}</ui-text>
      <ui-icon>unfold_more</ui-icon>
    </ui-flex>

    <mat-menu #teamSelectActions="matMenu">
      <ng-container *ngIf="unselectedTeams$ | Async as unselectedTeams">
        <ui-text
          *ngIf="unselectedTeams.length > 0"
          class="MatMenuHeader"
          colour="mid"
          size="small"
          weight="medium"
          marginBottom="small"
          transform="uppercase"
        >
          Switch Teams
        </ui-text>

        <div
          *ngFor="let team of unselectedTeams; trackBy: trackByMinimalTeam"
          mat-menu-item
          marginBottom="xxsmall"
          (click)="handleSelectTeam(team.id)"
        >
          <ui-text>{{ team.name }}</ui-text>
        </div>

        <mat-divider marginBottom="xxsmall"></mat-divider>

        <div class="MenuItem" mat-menu-item (click)="handleCreateTeam()">
          <ui-icon>add</ui-icon>
          <ui-text>Create new team</ui-text>
        </div>
      </ng-container>
    </mat-menu>
  `,
  styleUrls: ['./side-bar-team-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarTeamSelectComponent implements OnInit {
  selectedTeam$!: Observable<MinimalTeam>;
  teamName$!: Observable<string>;

  unselectedTeams$!: Observable<MinimalTeam[]>;

  constructor(
    private localStorage: LocalStorageService,
    private teams: TeamsService,
    private users: UsersService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    const selectedTeamId$ = this.localStorage
      .get('selectedTeam')
      .pipe(filter(isDefined));

    const currentUserResult$ = this.users.listenCurrentUser();
    const user$ = currentUserResult$.value$;

    this.selectedTeam$ = combineLatest([user$, selectedTeamId$]).pipe(
      map(([user, selectedTeamId]) => user?.joinedTeams?.get(selectedTeamId)),
      filter(isDefined)
    );

    this.unselectedTeams$ = combineLatest([user$, selectedTeamId$]).pipe(
      map(([user, selectedTeamId]) => {
        return Array.from(user?.joinedTeams.values() ?? []).filter(
          (team) => team.id !== selectedTeamId
        );
      })
    );

    this.teamName$ = this.selectedTeam$.pipe(map((team) => team.name));
  }

  handleCreateTeam(): void {
    this.modal.open(CreateTeamModalComponent, {}).then((teamId) => {
      if (!teamId) {
        return;
      }

      this.handleSelectTeam(teamId);
    });
  }

  trackByMinimalTeam(index: number, team: MinimalTeam) {
    return team.id;
  }

  handleSelectTeam(teamId: string) {
    this.localStorage.set('selectedTeam', teamId);
  }
}
