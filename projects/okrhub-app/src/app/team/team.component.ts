import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  template: `
    <ui-page title="Team Page">
      <router-outlet></router-outlet>
    </ui-page>
  `,
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
