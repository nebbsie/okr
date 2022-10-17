import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-mobile-top-bar title="Teams">
      <ui-button colour="warn" (click)="logout()"> Logout </ui-button>
      <ui-button type="icon" icon="settings"></ui-button>
    </app-mobile-top-bar>

    <ui-page [center]="true" contentDirection="column"> </ui-page>
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  usersId$!: Observable<string>;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.usersId$ = this.auth.getUserId();
  }

  async logout() {
    await firstValueFrom(this.auth.logout());
    await this.router.navigate(['/login']);
  }
}
