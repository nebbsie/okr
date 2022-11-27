import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-team-settings',
  template: `
    <p>
      team-settings works!
    </p>
  `,
  styleUrls: ['./team-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamSettingsComponent {

}
