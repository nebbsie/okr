import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DirectivesModule } from '@directives/directives.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { IconComponent } from '@ui/icon';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-more-options',
  standalone: true,
  imports: [
    DirectivesModule,
    MatTooltipModule,
    MatMenuModule,
    IconComponent,
    MatIconModule,
  ],
  template: `
    <ui-icon
      matTooltip="More options"
      colour="grey"
      [matMenuTriggerFor]="menu"
      [clickable]="true"
      (click)="$event.stopImmediatePropagation()"
    >
      more_horiz
    </ui-icon>

    <mat-menu #menu="matMenu">
      <ng-content></ng-content>
    </mat-menu>
  `,
  styleUrls: ['./more-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreOptionsComponent {}
