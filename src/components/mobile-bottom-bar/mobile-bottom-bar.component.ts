import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-mobile-bottom-bar',
  template: `
    <ui-button [routerLink]="'/'" type="icon" icon="home"></ui-button>
    <ui-button [routerLink]="'/profile'" type="icon" icon="person"></ui-button>
  `,
  styleUrls: ['./mobile-bottom-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileBottomBarComponent implements OnInit {
  userId$!: Observable<string>;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.userId$ = this.auth.getUserId();
  }
}
