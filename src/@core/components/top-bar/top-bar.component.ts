import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthService } from '@core/services';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  template: `
    <ui-text colour="white" size="large">{{ title }}</ui-text>

    <ng-content></ng-content>

    <img
      class="Avatar"
      src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=640&h=507&dpr=1"
      alt="Users avatar"
      [matMenuTriggerFor]="menu"
    />

    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="handleLogout()">
        <mat-icon>science</mat-icon>
        <span>Logout</span>
      </button>
    </mat-menu>
  `,
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  @Input() title!: string;

  constructor(private auth: AuthService, private router: Router) {}

  async handleLogout() {
    await firstValueFrom(this.auth.logout());
    await this.router.navigate(['/']);
  }
}
