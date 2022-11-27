import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ui-flex class="Navigation">
      <app-logged-out-navigation></app-logged-out-navigation>
      <div class="NavArea"></div>
    </ui-flex>

    <router-outlet></router-outlet>

    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
