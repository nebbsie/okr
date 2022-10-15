import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-bottom-bar',
  template: ` <ui-button type="icon" icon="home"></ui-button> `,
  styleUrls: ['./mobile-bottom-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileBottomBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
