import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { AuthService } from '@services/auth';
import { UsersService } from '@services/collections/users';

@Injectable({
  providedIn: 'root',
})
export class OnboardingGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private users: UsersService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return combineLatest([
      this.auth.isLoggedIn(),
      this.users.getCurrentUser().value$,
    ]).pipe(
      map(([isLoggedIn, currentUser]) => {
        if (!isLoggedIn) {
          return this.router.createUrlTree(['/login']);
        }

        if (currentUser?.isSetup) {
          return this.router.createUrlTree(['/']);
        }

        return true;
      })
    );
  }
}
