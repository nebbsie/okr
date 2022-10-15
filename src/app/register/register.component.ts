import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <ui-page [center]="true">
      <app-register-form
        class="Form"
        (successfullySignedUp)="handleSignedUp()"
      ></app-register-form>
    </ui-page>
  `,
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(private router: Router) {}

  async handleSignedUp() {
    await this.router.navigate(['/dashboard']);
  }
}
