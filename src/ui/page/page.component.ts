import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TextComponent } from '@ui/text';
import { NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ScreenSizeService } from '@services/screen-size';
import { Observable } from 'rxjs';
import { PipesModule } from '@pipes/pipes.module';
import { DivComponent } from '@ui/div/div.component';
import { FlexComponent } from '@ui/flex';
import { AlignItems, FlexDirection, JustifyContent } from '@ui/flex/flex.types';

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
  ],
  template: `
    <ui-div class="PageTitle" *ngIf="(isMobile$ | Async) && title">
      <ui-text weight="medium">{{ title }}</ui-text>
    </ui-div>

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

  isMobile$!: Observable<boolean>;

  constructor(private screen: ScreenSizeService) {}

  ngOnInit() {
    this.isMobile$ = this.screen.isMobile();
  }
}
