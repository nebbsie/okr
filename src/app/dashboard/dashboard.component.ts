import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { GetResult, Store } from '@core/services/store';
import { UsersCollection } from '@core/services/store/config/collections';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-mobile-top-bar title="Teams">
      <ui-button colour="warn" (click)="logout()"> Logout </ui-button>
      <ui-button type="icon" icon="settings"></ui-button>
    </app-mobile-top-bar>

    <ui-page [center]="true" contentDirection="column">
      {{ user.result$ | Async | json }}

      <ui-button marginBottom="mid" (click)="createEnterprise()"
        >Create Enterprise</ui-button
      >

      <ui-button marginBottom="mid">Create Team</ui-button>

      <ui-button marginBottom="mid">Create Board</ui-button>
    </ui-page>
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  usersId$!: Observable<string>;

  user!: GetResult<UsersCollection>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.usersId$ = this.auth.getUserId();

    this.user = this.store.get('users', this.usersId$);
  }

  async logout() {
    await firstValueFrom(this.auth.logout());
    await this.router.navigate(['/login']);
  }

  createEnterprise(): void {}

  delete(): void {}

  get(): void {}
}
