import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  template: `
    <p>
      side-bar works!
    </p>
  `,
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
