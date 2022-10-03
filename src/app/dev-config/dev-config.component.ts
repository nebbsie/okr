import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dev-config',
  template: `
    <ui-button colour="warn" (click)="logout()"> Logout </ui-button>
  `,
  styleUrls: ['./dev-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevConfigComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async logout() {
    await firstValueFrom(this.auth.logout());
    await this.router.navigate(['/login']);
  }
}
