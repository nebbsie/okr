import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DirectivesModule } from '@directives/directives.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '@ui/button';
import { TextComponent } from '@ui/text';

@Component({
  selector: 'app-logged-out-navigation',
  standalone: true,
  imports: [
    TextComponent,
    RouterLink,
    ButtonComponent,
    DirectivesModule,
    MatMenuModule,
    MatIconModule,
  ],
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
      <ui-button class="EarlyAccessButton" type="stroked" [tall]="true">
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
