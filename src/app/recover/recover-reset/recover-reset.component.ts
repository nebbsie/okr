import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-reset',
  template: `
    <p>
      recover-reset works!
    </p>
  `,
  styleUrls: ['./recover-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoverResetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
