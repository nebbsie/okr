import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-top-bar title="Dashboard"> </app-top-bar>

    <ui-page [center]="true" contentDirection="column"> </ui-page>
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  usersId$!: Observable<string>;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.usersId$ = this.auth.getUserId();
  }
}
