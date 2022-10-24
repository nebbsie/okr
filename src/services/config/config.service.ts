import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { Config } from './config.types';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private router: Router) {}

  getConfig(activatedRoute: ActivatedRoute): Observable<Config> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => activatedRoute.snapshot),
      startWith(activatedRoute.snapshot),
      map((snapshot) => this.getRecursiveRouteData(snapshot))
    );
  }

  /**
   * Get config from nested child routes.
   * Route data is specified in appropriate RoutingModules
   */
  private getRecursiveRouteData(snapshot: ActivatedRouteSnapshot): Config {
    let { data } = snapshot;
    snapshot.children.forEach((child) => {
      data = { ...data, ...this.getRecursiveRouteData(child) };
    });
    return data as Config;
  }
}
