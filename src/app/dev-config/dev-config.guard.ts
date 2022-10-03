import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "@core/services";
import { EnvironmentService } from "@core/services/environment.service";

@Injectable({
  providedIn: "root",
})
export class DevConfigGuard implements CanActivate {
  constructor(private auth: AuthService, private env: EnvironmentService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.env.isDevConfigEnabled() && this.auth.isLoggedIn();
  }
}
