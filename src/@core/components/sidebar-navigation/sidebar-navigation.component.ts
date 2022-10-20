import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-sidebar-navigation',
  template: `
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
  `,
  styleUrls: ['./sidebar-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarNavigationComponent implements OnInit {
  @Input() people: any;
  @Input() teams: any;

  constructor() {}

  ngOnInit(): void {}
}
