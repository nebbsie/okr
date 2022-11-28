import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar-board-menu',
  template: `
    <ui-text class="Title" weight="medium">Board</ui-text>

    <app-side-bar-item
      icon="dashboard"
      [link]="'board/' + currentBoardId + '/'"
    >
      Dashboard
    </app-side-bar-item>

    <app-side-bar-item
      icon="groups"
      [link]="'board/' + currentBoardId + '/members'"
    >
      Members
    </app-side-bar-item>

    <app-side-bar-item
      icon="settings"
      [link]="'board/' + currentBoardId + '/settings'"
    >
      Settings
    </app-side-bar-item>
  `,
  styleUrls: ['./side-bar-board-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarBoardMenuComponent {
  @Input() currentBoardId?: string;
}
