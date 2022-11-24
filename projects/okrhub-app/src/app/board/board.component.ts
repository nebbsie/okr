import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { BoardsCollection, ListenResult, Store } from '@services/store';
import { isDefined } from '@utils/utils';

@Component({
  selector: 'app-boards',
  template: `
    <ui-page [title]="boardName$ | Async">
      <router-outlet></router-outlet>
    </ui-page>
  `,
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  boardName$!: Observable<string>;
  private boardsGetResult!: ListenResult<BoardsCollection>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    const boardId$: Observable<string> = this.route.params.pipe(
      map((params) => params['id'])
    );

    this.boardsGetResult = this.store.listen<BoardsCollection>(
      'boards',
      boardId$
    );

    const board$ = this.boardsGetResult.value$.pipe(filter(isDefined));

    this.boardName$ = board$.pipe(map((board) => board.name));
  }
}
