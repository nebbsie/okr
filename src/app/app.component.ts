import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { Observable } from 'rxjs';
import { ConfigService } from '@core/services/config/config.service';
import { Config } from '@core/services/config/config.types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="config$ | Async as config">
      <ui-center
        *ngIf="!(isLoggedIn$ | Async) && config.noShell !== true"
        class="Navigation"
      >
        <app-logged-out-navigation></app-logged-out-navigation>
      </ui-center>

      <main class="Content">
        <router-outlet></router-outlet>
      </main>

      <app-footer
        *ngIf="!(isLoggedIn$ | Async) && config.noShell !== true"
      ></app-footer>

      <app-mobile-bottom-bar
        *ngIf="(isLoggedIn$ | Async) && config.noShell !== true"
        [hideTablet]="true"
      ></app-mobile-bottom-bar>
    </ng-container>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  config$!: Observable<Config>;

  constructor(
    private auth: AuthService,
    private config: ConfigService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn();
    this.config$ = this.config.getConfig(this.route);
  }
}
