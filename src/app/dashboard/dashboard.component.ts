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
<<<<<<< HEAD
import {
  CreateData,
  Enterprise,
  EnterprisesCollection,
  GetResult,
  Store,
} from '@core/services/store';
import { UsersCollection } from '@core/services/store/config/collections';
=======
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
>>>>>>> 0d75837 (Changed main cards functionality)

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
        <div class="okr-headings-container okr-table-grid">
          <ui-text
            colour="heading-dark-grey"
            [ngClass]="{ 'centre-align-text': isLast }"
            *ngFor="let heading of displayedColumns; let isLast = last"
          >
            {{ heading }}
          </ui-text>
        </div>

        <ng-container *ngFor="let okr of dataSource">
          <!--          <div-->
          <!--            cdkDropList-->
          <!--            class="example-list draggable-list-container"-->
          <!--            (cdkDropListDropped)="drop($event, dataSource)"-->
          <!--          >-->

          <div class="flex-okr-expand-collapse">
            <div>
              <!--expand_less-->
              <mat-icon
                fontIcon="expand_more"
                (click)="showHideKeyResults(okr)"
              ></mat-icon>
            </div>
            <!--cdkDrag-->
            <div class="example-box okr-table-grid" marginBottom="xsmall">
              <div class="example-custom-placeholder" *cdkDragPlaceholder></div>
              <ui-text>{{ okr.objective }}</ui-text>
              <ui-text>{{ okr.createdDate }}</ui-text>
              <ui-text>{{ okr.owner }}</ui-text>
              <ui-text>{{ okr.team }}</ui-text>
              <!--progress bar and stats area-->
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
              <!--end stats section-->
              <div class="flex">
                <mat-icon fontIcon="more_vert"></mat-icon>
              </div>
            </div>
            <!--end draggable box first-->
          </div>
          <!--          </div>-->
          <div
            cdkDropList
            class="example-list draggable-list-container"
            (cdkDropListDropped)="drop($event, okr.keyResults)"
          >
            <!--start draggable inner keyResults-->
            <div
              class="example-box okr-table-grid inner-okr-key-result-row"
              cdkDrag
              *ngFor="let keyResult of okr.keyResults"
              marginBottom="xsmall"
            >
              <div class="example-custom-placeholder" *cdkDragPlaceholder></div>
              <ui-text>{{ keyResult.name }}</ui-text>
              <ui-text>{{ keyResult.createdDate }}</ui-text>
              <ui-text>{{ keyResult.owner }}</ui-text>
              <ui-text>{{ keyResult.team }}</ui-text>
              <!--progress bar and stats area-->
              <div>
                <div class="flex-space-between">
                  <ui-text
                    [colour]="getReturnColour(keyResult.stats.state)"
                    weight="medium"
                  >
                    {{ keyResult.stats.progression * 100 + '%' }}
                  </ui-text>
                  <div
                    [ngClass]="{
                      'on-track-bg-colour':
                        keyResult.stats.state === 'On Track',
                      'off-track-bg-colour':
                        keyResult.stats.state === 'Off Track',
                      'achieved-bg-colour': keyResult.stats.state === 'Achieved'
                    }"
                    class="state-bg"
                    marginBottom="xxxsmall"
                  >
                    <ui-text
                      [colour]="getReturnColour(keyResult.stats.state)"
                      weight="medium"
                    >
                      {{ keyResult.stats.state }}
                    </ui-text>
                  </div>
                </div>
                <mat-progress-bar
                  mode="determinate"
                  [value]="keyResult.stats.progression * 100"
                  marginBottom="xxxsmall"
                ></mat-progress-bar>
                <ui-text size="xsmall">
                  {{ 'Updated: ' + keyResult.stats.updatedAt }}
                </ui-text>
              </div>
              <!--end stats section-->
              <div class="flex">
                <mat-icon fontIcon="more_vert"></mat-icon>
              </div>
            </div>
            <!--end draggable box inner keyResults-->
          </div>
        </ng-container>
        <!--end drop list-->
      </div>
      <!--end main page section-->
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
    keyResults: {
      name: string;
      createdDate: string;
      owner: string;
      team: string;
      stats: { progression: number; state: string; updatedAt: string };
    }[];
  }[] = [
    {
      objective: 'Build Nebbsie The Dash',
      createdDate: 'Oct 4',
      owner: 'Anil R',
      team: 'Sales',
      stats: { progression: 0.25, state: 'On Track', updatedAt: '01/04/20222' },
      keyResults: [
        {
          name: 'Build Nebbsie #1 Key Result',
          createdDate: 'Oct 4',
          owner: 'Anil R',
          team: 'Sales',
          stats: {
            progression: 0.25,
            state: 'On Track',
            updatedAt: '01/04/20222',
          },
        },
        {
          name: 'Build Nebbsie #2 Key Result',
          createdDate: 'Oct 4',
          owner: 'Anil R',
          team: 'Sales',
          stats: {
            progression: 0.25,
            state: 'On Track',
            updatedAt: '01/04/20222',
          },
        },
        {
          name: 'Build Nebbsie #3 Key Result',
          createdDate: 'Oct 4',
          owner: 'Anil R',
          team: 'Sales',
          stats: {
            progression: 0.25,
            state: 'On Track',
            updatedAt: '01/04/20222',
          },
        },
      ],
    },
    {
      objective: 'Finalise Design of OKR as a Service',
      createdDate: 'Oct 4',
      owner: 'Aaron N',
      team: 'Developers',
      stats: { progression: 0.1, state: 'Off Track', updatedAt: '01/04/20222' },
      keyResults: [
        {
          name: 'Finalise Design #1 Key Result',
          createdDate: 'Oct 4',
          owner: 'Anil R',
          team: 'Sales',
          stats: {
            progression: 0.25,
            state: 'On Track',
            updatedAt: '01/04/20222',
          },
        },
        {
          name: 'Finalise Design #2 Key Result',
          createdDate: 'Oct 4',
          owner: 'Anil R',
          team: 'Sales',
          stats: {
            progression: 0.25,
            state: 'On Track',
            updatedAt: '01/04/20222',
          },
        },
      ],
    },
    {
      objective:
        'Close the open non-tech poistions: Growth Leader, Finance Manager',
      createdDate: 'Oct 4',
      owner: 'Aaron N',
      team: 'Sales',
      stats: { progression: 1.0, state: 'Achieved', updatedAt: '01/04/20222' },
      keyResults: [
        {
          name: 'Close the open #1 Key Result',
          createdDate: 'Oct 4',
          owner: 'Anil R',
          team: 'Sales',
          stats: {
            progression: 0.25,
            state: 'On Track',
            updatedAt: '01/04/20222',
          },
        },
      ],
    },
  ];

  displayedColumns: string[] = [
    'Objective',
    'Created Date',
    'Owner',
    'Team',
    'Status',
    'Options',
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

  drop(event: CdkDragDrop<string[]>, arrayToChange: any) {
    moveItemInArray(arrayToChange, event.previousIndex, event.currentIndex);
  }

  showHideKeyResults(okr: {
    objective: string;
    createdDate: string;
    owner: string;
    team: string;
    stats: { progression: number; state: string; updatedAt: string };
    keyResults: {
      name: string;
      createdDate: string;
      owner: string;
      team: string;
      stats: { progression: number; state: string; updatedAt: string };
    }[];
  }) {}

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
