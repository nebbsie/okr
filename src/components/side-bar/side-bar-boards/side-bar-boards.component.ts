import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, firstValueFrom, map, Observable } from 'rxjs';
import {
  MapToArray,
  MinimalBoard,
  Store,
  TeamsCollection,
} from '@services/store';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { isDefined } from '@utils/utils';
import { ModalService } from '@services/modal';
import { CreateBoardModalComponent } from '@components/modals/create-board-modal';
import { trackById } from '@services/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-boards',
  template: `
    <ui-flex
      class="Title"
      align="center"
      justify="space-between"
      marginBottom="xxxsmall"
    >
      <ui-text weight="medium">Boards</ui-text>
      <ui-icon
        matTooltip="Create board"
        [clickable]="true"
        size="xmid"
        (click)="openCreateBoardModal()"
      >
        add
      </ui-icon>
    </ui-flex>

    <div class="BoardsList">
      <app-side-bar-item
        *ngFor="
          let board of teamBoards$ | Async;
          trackBy: trackById;
          let isLast = last
        "
        [routerLink]="'/board/' + board.id"
        routerLinkActive="SideBarActive"
        [marginBottom]="isLast ? 'small' : 'none'"
      >
        {{ board.name }}
      </app-side-bar-item>
    </div>

    <ui-spinner
      *ngIf="loadingBoards$ | Async"
      class="Loading"
      marginBottom="small"
    ></ui-spinner>

    <ui-alert
      *ngIf="hasNoBoards$ | Async"
      class="Empty"
      type="info"
      padding="small"
      textSize="small"
      marginBottom="small"
    >
      This team has no boards.
    </ui-alert>
  `,
  styleUrls: ['./side-bar-boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarBoardsComponent implements OnInit {
  trackById = trackById;

  teamBoards$!: Observable<MinimalBoard[]>;
  hasNoBoards$!: Observable<boolean>;
  loadingBoards$!: Observable<boolean>;

  constructor(
    private localStorage: LocalStorageService,
    private store: Store,
    private modal: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    const selectedTeamId$ = this.localStorage
      .get('selectedTeam')
      .pipe(filter(isDefined));

    const selectedTeamResult = this.store.listen<TeamsCollection>(
      'teams',
      selectedTeamId$
    );

    this.loadingBoards$ = selectedTeamResult.loading$;

    this.teamBoards$ = selectedTeamResult.value$.pipe(
      map((b) => MapToArray(b?.boards))
    );

    this.hasNoBoards$ = this.teamBoards$.pipe(
      map((boards) => boards.length === 0)
    );
  }

  async openCreateBoardModal() {
    const teamId = await firstValueFrom(
      this.localStorage.get('selectedTeam').pipe(filter(isDefined))
    );

    this.modal
      .open(CreateBoardModalComponent, {
        teamId,
      })
      .then((boardId) => {
        if (!boardId) {
          return;
        }

        this.router.navigate([`/board/${boardId}`]);
      });
  }
}
