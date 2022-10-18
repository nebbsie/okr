import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <ui-center *ngIf="!(isLoggedIn$ | Async)" class="Navigation">
      <app-logged-out-navigation></app-logged-out-navigation>
    </ui-center>

    <main class="Content">
      <router-outlet></router-outlet>
    </main>

    <app-footer *ngIf="!(isLoggedIn$ | Async)"></app-footer>

    <app-mobile-bottom-bar
      *ngIf="isLoggedIn$ | Async"
      [hideTablet]="true"
    ></app-mobile-bottom-bar>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn();
  }
}
