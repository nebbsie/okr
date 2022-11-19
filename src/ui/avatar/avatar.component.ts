import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AvatarSize } from '@ui/avatar/avatar.types';
import { Store, UsersCollection } from '@services/store';
import { filter, map, Observable } from 'rxjs';
import { isDefined } from '@utils/utils';

@Component({
  selector: 'ui-avatar',
  template: `
    <img
      *ngIf="hasAvatar$ | Async; else emptyAvatar"
      class="Avatar"
      [class.Clickable]="clickable"
      [attr.data-size]="size"
      [src]="avatarUrl$ | Async"
      alt="Users avatar"
    />

    <ng-template #emptyAvatar>
      <div class="Avatar" [class.Clickable]="clickable" [attr.data-size]="size">
        <ui-text colour="white" size="small" weight="medium">
          {{ avatarInitials$ | Async }}
        </ui-text>
      </div>
    </ng-template>
  `,
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  @Input() userId$!: Observable<string>;
  @Input() size: AvatarSize = 'small';
  @Input() clickable = false;

  hasAvatar$!: Observable<boolean>;
  avatarUrl$!: Observable<string>;
  avatarInitials$!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {
    const userResult = this.store.get<UsersCollection>('users', this.userId$);

    const user$ = userResult.value$;

    this.avatarUrl$ = user$.pipe(
      map((user) => user?.avatarUrl),
      filter(isDefined)
    );

    this.hasAvatar$ = user$.pipe(map((user) => !!user?.avatarUrl));

    this.avatarInitials$ = user$.pipe(
      map((user) =>
        user?.fullName
          .match(/(\b\S)?/g)
          ?.join('')
          .toUpperCase()
      ),
      filter(isDefined)
    );
  }
}
