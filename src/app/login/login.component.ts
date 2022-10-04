import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <ui-page [center]="true">
      <app-login-form
        class="Form"
        (successfullyLoggedIn)="handleLoggedIn()"
      ></app-login-form>
    </ui-page>
  `,
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loggedIn$!: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loggedIn$ = this.auth.isLoggedIn();
  }

  async handleLoggedIn() {
    await this.router.navigate(['/dashboard']);
  }
}
