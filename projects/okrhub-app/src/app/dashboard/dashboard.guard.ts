import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { AuthService } from '@services/auth';
import { UsersService } from '@services/collections/users';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private users: UsersService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return combineLatest([
      this.users.getCurrentUser().value$,
      this.auth.isLoggedIn(),
    ]).pipe(
      map(([user, isLoggedIn]) => {
        if (!isLoggedIn) {
          return this.router.createUrlTree(['/login']);
        }

        if (!user || !user.isSetup) {
          return this.router.createUrlTree(['/onboarding']);
        }

        return true;
      })
    );
  }
}
