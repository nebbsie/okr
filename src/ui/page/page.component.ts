import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TextComponent } from '@ui/text';
import { NgForOf, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ScreenSizeService } from '@services/screen-size';
import { Observable } from 'rxjs';
import { PipesModule } from '@pipes/pipes.module';
import { DivComponent } from '@ui/div/div.component';
import { FlexComponent } from '@ui/flex';
import { AlignItems, FlexDirection, JustifyContent } from '@ui/flex/flex.types';
import { MatMenuModule } from '@angular/material/menu';
import { IconComponent } from '@ui/icon';
import { MatIconModule } from '@angular/material/icon';
import { PageNavType } from '@ui/page/page.types';
import { DirectivesModule } from '@directives/directives.module';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ui-page',
  standalone: true,
  imports: [
    TextComponent,
    NgIf,
    MatTabsModule,
    PipesModule,
    DivComponent,
    FlexComponent,
    MatMenuModule,
    IconComponent,
    MatIconModule,
    NgForOf,
    DirectivesModule,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <ui-flex
      *ngIf="title"
      class="PageTopBar"
      align="center"
      justify="space-between"
    >
      <ui-text class="PageTopBar-content" weight="medium">{{ title }}</ui-text>

      <ui-icon
        *ngIf="pages"
        class="PageTopBar-content"
        colour="dark"
        size="large"
        [matMenuTriggerFor]="pages"
        [clickable]="true"
        (click)="$event.stopImmediatePropagation()"
      >
        menu
      </ui-icon>

      <mat-menu #pages>
        <button
          *ngFor="let navItem of navItems"
          class="NavButton"
          routerLinkActive="IsActive"
          [routerLink]="navItem.url"
          [routerLinkActiveOptions]="{ exact: true }"
          mat-menu-item
        >
          <mat-icon>{{ navItem.icon }}</mat-icon>
          <span>{{ navItem.title }}</span>
        </button>
      </mat-menu>
    </ui-flex>

    <ui-flex
      class="PageContainer"
      [align]="align"
      [direction]="direction"
      [justify]="justify"
    >
      <ng-content></ng-content>
    </ui-flex>
  `,
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
  @Input() title?: string;
  @Input() justify?: JustifyContent;
  @Input() align?: AlignItems;
  @Input() direction?: FlexDirection = 'column';
  @Input() navItems?: PageNavType[];

  isMobile$!: Observable<boolean>;

  constructor(private screen: ScreenSizeService) {}

  ngOnInit() {
    this.isMobile$ = this.screen.isMobile();
  }
}
