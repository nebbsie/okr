import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { AuthService } from '@services/auth';
import { ActivatedRoute } from '@angular/router';
import { Config, ConfigService } from '@services/config';
import { ScreenSizeService } from '@services/screen-size';

@Component({
  selector: 'app-root',
  template: `
    <mat-drawer-container
      *ngIf="showSidebar$ | Async; else page"
      class="Sidebar"
    >
      <mat-drawer mode="side" [opened]="true">
        <app-side-bar></app-side-bar>
      </mat-drawer>

      <mat-drawer-content>
        <ng-container *ngTemplateOutlet="page"></ng-container>
      </mat-drawer-content>
    </mat-drawer-container>

    <ng-template #page>
      <main>
        <router-outlet></router-outlet>
      </main>
    </ng-template>

    <app-mobile-bottom-bar
      *ngIf="showMobileBottomBar$ | Async"
    ></app-mobile-bottom-bar>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  config$!: Observable<Config>;
  showSidebar$!: Observable<boolean>;
  showMobileBottomBar$!: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private config: ConfigService,
    private route: ActivatedRoute,
    private screen: ScreenSizeService
  ) {}

  ngOnInit() {
    const isLoggedIn$ = this.auth.isLoggedIn();

    this.config$ = this.config.getConfig(this.route);

    this.showSidebar$ = combineLatest([
      this.screen.isMobile(),
      this.config$,
      isLoggedIn$,
    ]).pipe(
      map(
        ([isMobile, config, isLoggedIn]) =>
          !isMobile && config.noShell !== true && isLoggedIn
      )
    );

    this.showMobileBottomBar$ = combineLatest([
      this.screen.isMobile(),
      this.config$,
      isLoggedIn$,
    ]).pipe(
      map(
        ([isMobile, config, isLoggedIn]) =>
          isMobile && config.noShell !== true && isLoggedIn
      )
    );
  }
}
