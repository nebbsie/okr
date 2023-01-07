import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalStorageService } from '@services/local-storage';
import {
  MapToArray,
  MinimalBoard,
  Store,
  TeamsCollection,
} from '@services/store';
import { ModalService } from '@services/modal';
import { Router } from '@angular/router';
import { filter, firstValueFrom, map, Observable } from 'rxjs';
import { isDefined } from '@utils/utils';
import { CreateBoardModalComponent } from '@components/modals/create-board-modal';
import { trackById } from '@services/utils';

@Component({
  selector: 'app-mobile-boards',
  template: `<ui-page title="Team Boards">
    <ui-text
      *ngFor="let board of teamBoards$ | Async"
      [routerLink]="'/board/' + board.id"
    >
      {{ board.name }}
    </ui-text>
  </ui-page> `,
  styleUrls: ['./mobile-boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileBoardsComponent {
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
