import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  combineLatest,
  firstValueFrom,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { AuthService } from '@services/auth';
import { ActivatedRoute } from '@angular/router';
import { Config, ConfigService } from '@services/config';
import { ScreenSizeService } from '@services/screen-size';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { UsersService } from '@services/collections/users';

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
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private screen: ScreenSizeService,
    private users: UsersService
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

    firstValueFrom(
      combineLatest([
        this.localStorage.get('selectedWorkspace').pipe(startWith(false)),
        this.localStorage.get('selectedTeam').pipe(startWith(false)),
        this.users.getCurrentUser().value$,
      ]).pipe(
        map(([selectedWorkspace, selectedTeam, user]) => {
          console.log(selectedWorkspace, selectedTeam, user);

          // Users selected workspace has been lost, select the default one.
          if (!selectedWorkspace && user) {
            const [firstWorkspace] = user.joinedWorkspaces.values();
            this.localStorage.set('selectedWorkspace', firstWorkspace.id);
          }

          // Users selected team has been lost, select the default one.
          if (!selectedTeam && user) {
            const [firstTeam] = user.joinedTeams.values();
            this.localStorage.set('selectedTeam', firstTeam.id);
          }
        })
      )
    );
  }
}
