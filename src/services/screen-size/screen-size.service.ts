import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  constructor(public breakpointObserver: BreakpointObserver) {}

  isMobile(): Observable<boolean> {
    return this.breakpointObserver.observe(`(max-width: 660px)`).pipe(
      map((state) => state.matches),
      shareReplay()
    );
  }

  isTablet(): Observable<boolean> {
    return this.breakpointObserver.observe(`(min-width: 660px)`).pipe(
      map((state) => state.matches),
      shareReplay()
    );
  }

  isDesktop(): Observable<boolean> {
    return this.breakpointObserver.observe(`(min-width: 1200px)`).pipe(
      map((state) => state.matches),
      shareReplay()
    );
  }
}
