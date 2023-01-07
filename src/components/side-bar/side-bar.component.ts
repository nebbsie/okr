import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { ConfigService } from '@services/config';
import { isDefined } from '@utils/utils';
import { LocalStorageService } from '@services/local-storage/local-storage.service';

@Component({
  selector: 'app-side-bar',
  template: `
    <app-side-bar-team-select></app-side-bar-team-select>

    <ui-flex class="Content" direction="column">
      <app-side-bar-board-menu
        *ngIf="onBoardPage$ | Async"
        class="BoardsMenu"
        [currentBoardId]="currentBoardId$ | Async"
      ></app-side-bar-board-menu>

      <ui-flex class="MoveItems" direction="column">
        <span
          [class.PushToBottom]="onBoardPage$ | Async"
          [class.PushToTop]="!(onBoardPage$ | Async)"
        ></span>

        <app-side-bar-team-nav
          [currentTeamId]="currentTeamId$ | Async"
          [borderTop]="onBoardPage$ | Async"
        ></app-side-bar-team-nav>

        <app-side-bar-boards
          [borderTop]="true"
          [borderBottom]="!(onBoardPage$ | Async)"
        ></app-side-bar-boards>
      </ui-flex>
    </ui-flex>

    <app-side-bar-account class="AccountSection"></app-side-bar-account>
  `,
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent implements OnInit {
  onBoardPage$!: Observable<boolean>;

  currentBoardId$!: Observable<string>;
  currentTeamId$!: Observable<string>;

  constructor(
    private config: ConfigService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentTeamId$ = this.localStorage
      .get('selectedTeam')
      .pipe(filter(isDefined));

    const url$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(this.router.url),
      map((_) => this.router.url)
    );

    this.currentBoardId$ = url$.pipe(
      map((url) => {
        const urlSplit = url.split('/');
        if (urlSplit[1] === 'board') {
          return urlSplit[2];
        }
        return undefined;
      }),
      filter(isDefined)
    );

    const config$ = this.config.getConfig(this.route);

    this.onBoardPage$ = config$.pipe(map((config) => !!config?.isBoard));
  }
}
