import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-board-members',
  template: `
    <p>
      board-members works!
    </p>
  `,
  styleUrls: ['./board-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardMembersComponent {

}
