import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageNavType } from '@ui/page/page.types';

@Component({
  selector: 'app-team',
  template: `
    <ui-page title="Team Page" [navItems]="navItems">
      <router-outlet></router-outlet>
    </ui-page>
  `,
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent implements OnInit {
  navItems: PageNavType[] = [
    {
      icon: '',
      url: '',
      title: 'Dashboard',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
