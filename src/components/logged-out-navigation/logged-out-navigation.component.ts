import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logged-out-navigation',
  template: `
    <ui-text
      class="NameLogo"
      weight="bold"
      size="xxlarge"
      sizeTablet="xxxlarge"
      sizeDesktop="xxxlarge"
      routerLink="/"
    >
      okrhub
    </ui-text>

    <div class="Actions" [hideMobile]="true">
      <ui-button class="EarlyAccessButton" type="stroked" [tallButton]="true">
        REQUEST EARLY ACCESS
      </ui-button>
    </div>

    <ui-button
      type="icon"
      icon="menu"
      [hideTablet]="true"
      [hideDesktop]="true"
      [matMenuTriggerFor]="menu"
    ></ui-button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item>
        <mat-icon>science</mat-icon>
        <span>Request Early Access</span>
      </button>
    </mat-menu>
  `,
  styleUrls: ['./logged-out-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoggedOutNavigationComponent {}
