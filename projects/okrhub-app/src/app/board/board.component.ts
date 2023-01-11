import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { BoardsCollection, Store } from '@services/store';
import { isDefined } from '@utils/utils';
import { PageNavType } from '@ui/page/page.types';

@Component({
  selector: 'app-boards',
  template: `
    <ui-page [title]="boardName$ | Async" [navItems]="navItems$ | Async">
      <router-outlet></router-outlet>
    </ui-page>
  `,
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  navItems$!: Observable<PageNavType[]>;

  boardName$!: Observable<string>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    const boardId$: Observable<string> = this.route.params.pipe(
      map((params) => params['id'])
    );

    const boardsGetResult = this.store.listen<BoardsCollection>(
      'boards',
      boardId$
    );

    const board$ = boardsGetResult.value$.pipe(filter(isDefined));

    this.boardName$ = board$.pipe(map((board) => board.name));

    this.navItems$ = board$.pipe(
      map((board) => {
        return [
          { title: 'Dashboard', url: `/board/${board.id}`, icon: 'dashboard' },
          {
            title: 'Members',
            url: `/board/${board.id}/members`,
            icon: 'people',
          },
          {
            title: 'Settings',
            url: `/board/${board.id}/settings`,
            icon: 'settings',
          },
        ];
      })
    );
  }
}
