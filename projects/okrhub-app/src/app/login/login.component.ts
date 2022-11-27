import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <ui-page direction="row" justify="center">
      <app-login-form
        class="Form"
        (successfullyLoggedIn)="handleLoggedIn()"
      ></app-login-form>
    </ui-page>
  `,
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private router: Router) {}

  async handleLoggedIn() {
    await this.router.navigate(['/']);
  }
}
