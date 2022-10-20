import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { map, Observable } from 'rxjs';
import { ConfigService } from '@core/services/config/config.service';
import { Config } from '@core/services/config/config.types';
import { ActivatedRoute } from '@angular/router';
import { ScreenSizeService } from '@core/services/screen-size/screen-size.service';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="authState$ | Async as authState">
      <ng-container *ngIf="config$ | Async as config">
        <ng-container
          *ngIf="authState === 'loggedOut' && config.noShell !== true"
        >
          <ui-center class="Navigation">
            <app-logged-out-navigation></app-logged-out-navigation>
          </ui-center>

          <div class="NavArea"></div>
        </ng-container>

        <mat-drawer-container
          [class.DrawerContainer]="
            authState === 'loggedIn' && (showSidebar$ | Async)
          "
        >
          <mat-drawer
            *ngIf="authState === 'loggedIn' && (showSidebar$ | Async)"
            mode="side"
            [opened]="showSidebar$ | Async"
          >
            <app-side-bar></app-side-bar>
          </mat-drawer>

          <mat-drawer-content>
            <router-outlet></router-outlet>
          </mat-drawer-content>
        </mat-drawer-container>

        <app-footer
          *ngIf="authState === 'loggedOut' && config.noShell !== true"
        ></app-footer>

        <app-mobile-bottom-bar
          *ngIf="authState === 'loggedIn' && config.noShell !== true"
          [hideTablet]="true"
        ></app-mobile-bottom-bar>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  authState$!: Observable<'loggedIn' | 'loggedOut'>;
  config$!: Observable<Config>;
  showSidebar$!: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private config: ConfigService,
    private route: ActivatedRoute,
    private screen: ScreenSizeService
  ) {}

  ngOnInit() {
    this.authState$ = this.auth
      .isLoggedIn()
      .pipe(map((isLoggedIn) => (isLoggedIn ? 'loggedIn' : 'loggedOut')));

    this.config$ = this.config.getConfig(this.route);

    this.showSidebar$ = this.screen
      .isMobile()
      .pipe(map((isMobile) => !isMobile));
  }
}
