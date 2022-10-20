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
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  template: `
    <!--    <ui-page [center]="true" contentDirection="column">-->
    <!--      <ui-button colour="warn" (click)="logout()"> Logout </ui-button>-->

    <!--    <app-mobile-top-bar title="Teams">-->
    <!--      <ui-button colour="warn" (click)="logout()"> Logout </ui-button>-->
    <!--      <ui-button type="icon" icon="settings"></ui-button>-->
    <!--    </app-mobile-top-bar>-->

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
      <app-sidebar-navigation
        [people]="people"
        [teams]="teams"
      ></app-sidebar-navigation>

      <!--Main Cards Area-->
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

        <!--        <ng-container *ngFor="let okr of dataSource">-->
        <!--          <div-->
        <!--            cdkDropList-->
        <!--            class="example-list draggable-list-container"-->
        <!--            (cdkDropListDropped)="drop($event, dataSource)"-->
        <!--          >-->
        <!--            <app-objective-parent-card-->
        <!--              [visibility]="showKeyResults"-->
        <!--              (keyResultListVisibilityEvent)="showHideKeyResults($event)"-->
        <!--              [okr]="okr"-->
        <!--            ></app-objective-parent-card>-->

        <!--            &lt;!&ndash;start draggable inner keyResults&ndash;&gt;-->
        <!--            <app-key-result-list-->
        <!--              *ngIf="showKeyResults"-->
        <!--              [keyResults]="okr.keyResults"-->
        <!--            ></app-key-result-list>-->
        <!--            &lt;!&ndash;end draggable box inner keyResults&ndash;&gt;-->
        <!--          </div>-->
        <!--        </ng-container>-->

        <ng-container *ngFor="let okr of dataSource">
          <app-objective-card-list
            [okr]="okr"
            [dataSource]="dataSource"
          ></app-objective-card-list>
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

  showKeyResults: boolean = true;

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

  showHideKeyResults(showHide: boolean) {
    console.log('showsing the output of bool from parent');
    console.log(showHide);
    this.showKeyResults = showHide;
    console.log('new parent value is: ' + this.showKeyResults);
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
