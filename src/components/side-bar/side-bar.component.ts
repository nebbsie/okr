import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  template: `
    <app-side-bar-team-select></app-side-bar-team-select>

    <div class="Content">
      <app-side-bar-boards></app-side-bar-boards>
    </div>

    <app-side-bar-account class="AccountSection"></app-side-bar-account>
  `,
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
