import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  template: `
    <app-side-bar-team-select marginBottom="large"></app-side-bar-team-select>

    <div class="Content"></div>

    <app-side-bar-account class="AccountSection"></app-side-bar-account>
  `,
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {}
