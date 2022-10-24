import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from '@services/auth';
import { ActivatedRoute } from '@angular/router';
import { Config, ConfigService } from '@services/config';
import { ScreenSizeService } from '@services/screen-size';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="authState$ | Async as authState">
      <ng-container *ngIf="config$ | Async as config">
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

        <app-mobile-bottom-bar
          *ngIf="authState === 'loggedIn' && config.noShell !== true"
          [hideTablet]="true"
        ></app-mobile-bottom-bar>
      </ng-container>
    </ng-container>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
