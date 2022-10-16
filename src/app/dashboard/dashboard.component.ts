import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { combineLatest, firstValueFrom, map, Observable } from 'rxjs';
import {
  CreateData,
  Enterprise,
  EnterprisesCollection,
  GetResult,
  Store,
} from '@core/services/store';
import { UsersCollection } from '@core/services/store/config/collections';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-mobile-top-bar title="Teams">
      <ui-button colour="warn" (click)="logout()"> Logout </ui-button>
      <ui-button type="icon" icon="settings"></ui-button>
    </app-mobile-top-bar>

    <ui-page [center]="true" contentDirection="column">
      {{ userResult.result$ | Async | json }}

      <ui-button marginBottom="mid" (click)="createEnterprise()">
        Create Enterprise
      </ui-button>

      <ui-button marginBottom="mid" (click)="createTeam()"
        >Create Team</ui-button
      >

      <ui-button marginBottom="mid" (click)="createBoard()"
        >Create Board</ui-button
      >
    </ui-page>
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  usersId$!: Observable<string>;

  userResult!: GetResult<UsersCollection>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.usersId$ = this.auth.getUserId();

    this.userResult = this.store.get('users', this.usersId$);
  }

  async logout() {
    await firstValueFrom(this.auth.logout());
    await this.router.navigate(['/login']);
  }

  async createEnterprise() {
    const enterpriseId = await firstValueFrom(
      this.store.create<EnterprisesCollection>(
        'enterprises',
        combineLatest([this.auth.getUserId()]).pipe(
          map(([userId]) => {
            const request: CreateData<Enterprise> = {
              creatorId: userId,
              name: 'My Test Enterprise',
            };

            return request;
          })
        )
      ).result$
    );
  }

  createTeam(): void {}

  createBoard(): void {}
}
