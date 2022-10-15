import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>

    <app-mobile-bottom-bar
      *ngIf="isLoggedIn$ | Async"
      [hideTablet]="true"
    ></app-mobile-bottom-bar>
  `,
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn();
  }
}
