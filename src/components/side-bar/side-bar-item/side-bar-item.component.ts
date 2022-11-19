import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-item',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./side-bar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
