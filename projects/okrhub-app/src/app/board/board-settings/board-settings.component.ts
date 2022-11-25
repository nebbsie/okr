import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-board-settings',
  template: `
    <p>
      board-settings works!
    </p>
  `,
  styleUrls: ['./board-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardSettingsComponent {

}
