import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-team-members',
  template: `
    <p>
      team-members works!
    </p>
  `,
  styleUrls: ['./team-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamMembersComponent {

}
