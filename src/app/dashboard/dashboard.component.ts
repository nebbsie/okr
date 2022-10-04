import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { combineLatest, firstValueFrom, map, Observable } from 'rxjs';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { TextColour } from '@core/ui';
import {
  CreateData,
  Enterprise,
  EnterprisesCollection,
  GetResult,
  Store,
} from '@core/services/store';
import { UsersCollection } from '@core/services/store/config/collections';

@Component({
  selector: 'app-dashboard',
  template: `
    <!--    <ui-page [center]="true" contentDirection="column">-->
    <!--      <ui-button colour="warn" (click)="logout()"> Logout </ui-button>-->

    <!--      <ui-text>Dashboard</ui-text>-->

    <app-mobile-top-bar title="Teams">
      <ui-button colour="warn" (click)="logout()"> Logout </ui-button>
      <ui-button type="icon" icon="settings"></ui-button>
    </app-mobile-top-bar>

    <!--<ui-page [center]="true" contentDirection="column">
      {{ userResult.result$ | Async | json }}
    </ui-page>-->

    <!--Navigation-->
    <nav class="flex">
      <!--        <img class="logo" src="" />-->
      <ui-text colour="white">OKRHub</ui-text>
      <ul class="nav-links-container flex">
        <li class="active">Home</li>
        <li>Goals</li>
        <li>etc</li>
      </ul>
      <div class="profile-settings-container flex">
        <img
          class="avatar"
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="profile image"
        />
        <mat-icon fontIcon="expand_more" class="icon-colour-white"></mat-icon>
      </div>
    </nav>

    <!-- Creates a layout with a left-positioned sidenav and explicit content. -->
    <div class="page-container grid">
      <mat-sidenav-container class="sidebar">
        <mat-sidenav mode="side">Start</mat-sidenav>

        <mat-sidenav-content
          class="sidebar-top-content sidebar-item-padding-margin flex active"
        >
          <div class="top-links-info-container flex">
            <mat-icon fontIcon="person_outline"></mat-icon>
            <ui-text weight="medium" size="small">You</ui-text>
          </div>
          <div class="top-links-number-container">
            <ui-text weight="medium" size="small">3</ui-text>
          </div>
        </mat-sidenav-content>
        <mat-sidenav-content
          class="sidebar-top-content sidebar-item-padding-margin flex"
        >
          <div class="top-links-info-container flex">
            <mat-icon fontIcon="people_outline"></mat-icon>
            <ui-text weight="medium" size="small">Teams</ui-text>
          </div>
          <div class="top-links-number-container">
            <ui-text weight="medium" size="small">7</ui-text>
          </div>
        </mat-sidenav-content>
        <mat-sidenav-content
          class="sidebar-top-content sidebar-item-padding-margin flex"
          marginBottom="xsmall"
        >
          <div class="top-links-info-container flex">
            <mat-icon fontIcon="business"></mat-icon>
            <ui-text weight="medium" size="small">Companies</ui-text>
          </div>
          <div class="top-links-number-container">
            <ui-text weight="medium" size="small">12</ui-text>
          </div>
        </mat-sidenav-content>

        <mat-sidenav-content
          class="flex-space-between sidebar-item-padding-margin"
        >
          <ui-text>People (34)</ui-text>
          <mat-icon fontIcon="add"></mat-icon>
        </mat-sidenav-content>

        <mat-sidenav-content
          *ngFor="let person of people"
          class="sidebar-person-element flex-space-only sidebar-item-padding-margin"
        >
          <img [src]="person.avatarImg" alt="" />
          <div class="sidebar-person-element-info">
            <ui-text weight="medium" size="small">{{ person.name }}</ui-text>
            <ui-text weight="regular" size="small">{{ person.role }}</ui-text>
          </div>
        </mat-sidenav-content>

        <mat-sidenav-content
          class="sidebar-item-padding-left-right"
          marginBottom="xsmall"
        >
          <ui-text weight="regular" size="small">Show more</ui-text>
        </mat-sidenav-content>

        <mat-sidenav-content
          class="flex-space-between sidebar-item-padding-margin"
        >
          <ui-text>Teams (7)</ui-text>
          <mat-icon fontIcon="add"></mat-icon>
        </mat-sidenav-content>

        <mat-sidenav-content
          class="teams-sidebar-section sidebar-item-padding-margin"
          *ngFor="let team of teams"
        >
          <div class="flex">
            <div class="sidebar-teams-icon-container flex">
              <mat-icon fontIcon="people_outline"></mat-icon>
            </div>
            <ui-text weight="regular" size="mid">{{ team.name }}</ui-text>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>

      <div class="content-area">
        <table
          mat-table
          [dataSource]="dataSource"
          class="mat-elevation-z8 content-table"
        >
          <!--- Note that these columns can be defined in any order.
                      The actual rendered columns are set as a property on the row definition" -->

          <!-- Position Column -->
          <ng-container matColumnDef="objective">
            <th mat-header-cell *matHeaderCellDef>Objective</th>
            <td mat-cell *matCellDef="let okr">{{ okr.objective }}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="createdDate">
            <th mat-header-cell *matHeaderCellDef>Created Date</th>
            <td mat-cell *matCellDef="let okr">{{ okr.createdDate }}</td>
          </ng-container>

          <!-- Weight Column -->
          <ng-container matColumnDef="owner">
            <th mat-header-cell *matHeaderCellDef>Owner</th>
            <td mat-cell *matCellDef="let okr">{{ okr.owner }}</td>
          </ng-container>

          <!-- Symbol Column -->
          <ng-container matColumnDef="team">
            <th mat-header-cell *matHeaderCellDef>Team</th>
            <td mat-cell *matCellDef="let okr">{{ okr.team }}</td>
          </ng-container>

          <!-- Symbol Column -->
          <!--          <ng-container matColumnDef="state">-->
          <!--            <th mat-header-cell *matHeaderCellDef>Status</th>-->
          <!--            <td mat-cell *matCellDef="let okr">{{ okr.stats.state }}</td>-->
          <!--          </ng-container>-->

          <ng-container matColumnDef="state">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let okr">
              <div>
                <div class="flex-space-between">
                  <ui-text
                    [colour]="getReturnColour(okr.stats.state)"
                    weight="medium"
                  >
                    {{ okr.stats.progression * 100 + '%' }}
                  </ui-text>
                  <div
                    [ngClass]="{
                      'on-track-bg-colour': okr.stats.state === 'On Track',
                      'off-track-bg-colour': okr.stats.state === 'Off Track',
                      'achieved-bg-colour': okr.stats.state === 'Achieved'
                    }"
                    class="state-bg"
                    marginBottom="xxxsmall"
                  >
                    <ui-text
                      [colour]="getReturnColour(okr.stats.state)"
                      weight="medium"
                    >
                      {{ okr.stats.state }}
                    </ui-text>
                  </div>
                </div>
                <mat-progress-bar
                  mode="determinate"
                  [value]="okr.stats.progression * 100"
                  marginBottom="xxxsmall"
                ></mat-progress-bar>
                <ui-text size="xsmall">
                  {{ 'Updated: ' + okr.stats.updatedAt }}
                </ui-text>
              </div>
            </td>
          </ng-container>

          <!-- Symbol Column -->
          <ng-container matColumnDef="options">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let okr">
              <div class="flex">
                <mat-icon fontIcon="more_vert"></mat-icon>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </div>
    <!--    </ui-page>-->
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  usersId$!: Observable<string>;

  userResult!: GetResult<UsersCollection>;

  //@ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;

  people = [
    {
      avatarImg: 'https://avatars.dicebear.com/api/adventurer/.svg',
      name: 'Michael Scott',
      role: 'General Manager',
    },
    {
      avatarImg: 'https://avatars.dicebear.com/api/adventurer/ann.svg',
      name: 'Anna Michaels',
      role: 'Sales Manager',
    },
    {
      avatarImg: 'https://avatars.dicebear.com/api/adventurer/vanya.svg',
      name: 'Valya Shevchenko',
      role: 'Account Executive',
    },
    {
      avatarImg: 'https://avatars.dicebear.com/api/adventurer/david.svg',
      name: 'David Lidl',
      role: 'Marketing',
    },
    {
      avatarImg: 'https://avatars.dicebear.com/api/adventurer/thomas.svg',
      name: 'Thomas Salsberry',
      role: 'General Manager',
    },
    {
      avatarImg: 'https://avatars.dicebear.com/api/adventurer/aiden.svg',
      name: 'Aiden Salsberry',
      role: 'General Manager',
    },
  ];

  teams = [
    { name: 'Sales' },
    { name: 'Marketing' },
    { name: 'Management Information' },
    { name: 'Developers' },
  ];

  dataSource: {
    objective: string;
    createdDate: string;
    owner: string;
    team: string;
    stats: { progression: number; state: string; updatedAt: string };
  }[] = [
    {
      objective: 'Build Nebbsie The Dash',
      createdDate: 'Oct 4',
      owner: 'Anil R',
      team: 'Sales',
      stats: { progression: 0.25, state: 'On Track', updatedAt: '01/04/20222' },
    },
    {
      objective: 'Finalise Design of OKR as a Service',
      createdDate: 'Oct 4',
      owner: 'Aaron N',
      team: 'Developers',
      stats: { progression: 0.1, state: 'Off Track', updatedAt: '01/04/20222' },
    },
    {
      objective:
        'Close the open non-tech poistions: Growth Leader, Finance Manager',
      createdDate: 'Oct 4',
      owner: 'Aaron N',
      team: 'Sales',
      stats: { progression: 1.0, state: 'Achieved', updatedAt: '01/04/20222' },
    },
  ];

  displayedColumns: string[] = [
    'objective',
    'createdDate',
    'owner',
    'team',
    'state',
    'options',
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.usersId$ = this.auth.getUserId();

    this.userResult = this.store.get('users', this.usersId$);
  }

  ngAfterViewInit() {
    //this.sidenavContainer.scrollable.elementScrolled().subscribe(() => /* react to scrolling */);
  }

  async logout() {
    await firstValueFrom(this.auth.logout());
    await this.router.navigate(['/login']);
  }

  getReturnColour(state: string): TextColour {
    if (state === 'On Track') {
      return 'success';
    }

    if (state === 'Off Track') {
      return 'danger';
    }

    if (state === 'Achieved') {
      return 'achieved';
    }

    return 'dark';
  }

  async createEnterprise() {
    const enterpriseId = await firstValueFrom(
      this.store.create<EnterprisesCollection>(
        'enterprises',
        combineLatest([this.auth.getUserId()]).pipe(
          map(([userId]) => {
            const request: CreateData<Enterprise> = {
              creatorId: userId,
              name: 'My Test Enterprise',
            };

            return request;
          })
        )
      ).result$
    );
  }

  createTeam(): void {}

  createBoard(): void {}
}
