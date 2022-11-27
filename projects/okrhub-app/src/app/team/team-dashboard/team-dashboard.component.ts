import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-team-dashboard',
  template: `
    <p>
      team-dashboard works!
    </p>
  `,
  styleUrls: ['./team-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamDashboardComponent {

}
