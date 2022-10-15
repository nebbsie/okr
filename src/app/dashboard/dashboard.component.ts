import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { User, UsersService } from '@core/services/collections/users';
import { GetResult } from '@core/services/store';

@Component({
  selector: 'app-dashboard',
  template: `
    <ui-page [center]="true" contentDirection="column">
      <ui-button colour="warn" marginBottom="mid" (click)="logout()">
        Logout
      </ui-button>

      <ui-text marginBottom="large">Dashboard</ui-text>

      User: {{ user.result$ | Async | json }}
      <br />

      Loading:
      {{ user.loading$ | Async | json }}
      <br />

      Error: {{ user.error$ | Async | json }}
      <br />
    </ui-page>
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  usersId$!: Observable<string>;

  user!: GetResult<User>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private users: UsersService
  ) {}

  ngOnInit(): void {
    this.usersId$ = this.auth.getUserId();

    this.user = this.users.getById(this.usersId$);
  }

  async logout() {
    await firstValueFrom(this.auth.logout());
    await this.router.navigate(['/login']);
  }

  create(): void {}

  delete(): void {}

  get(): void {}
}
