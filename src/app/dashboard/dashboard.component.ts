import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  template: `
    <ui-page [center]="true" contentDirection="column">
      <ui-button colour="warn" (click)="logout()"> Logout </ui-button>

      <ui-text>Dashboard</ui-text>
    </ui-page>
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async logout() {
    await firstValueFrom(this.auth.logout());
    await this.router.navigate(['/login']);
  }
}
