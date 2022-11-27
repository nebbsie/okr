import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-board-menu',
  template: `
    <ui-text class="Title" weight="medium">Board</ui-text>

    <app-side-bar-item
      routerLinkActive="SideBarActive"
      icon="dashboard"
      [routerLink]="'board/' + currentBoardId + '/'"
      [routerLinkActiveOptions]="{ exact: true }"
    >
      Dashboard
    </app-side-bar-item>

    <app-side-bar-item
      routerLinkActive="SideBarActive"
      icon="groups"
      [routerLink]="'board/' + currentBoardId + '/members'"
      [routerLinkActiveOptions]="{ exact: true }"
    >
      Members
    </app-side-bar-item>

    <app-side-bar-item
      routerLinkActive="SideBarActive"
      icon="settings"
      [routerLink]="'board/' + currentBoardId + '/settings'"
      [routerLinkActiveOptions]="{ exact: true }"
    >
      Settings
    </app-side-bar-item>
  `,
  styleUrls: ['./side-bar-board-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarBoardMenuComponent implements OnInit {
  @Input() currentBoardId?: string;

  constructor(private router: Router) {}

  ngOnInit() {}
}
