import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Objective } from '@services/store';
import { TextComponent } from '@ui/text';
import { DivComponent } from '@ui/div';
import { JsonPipe, NgForOf } from '@angular/common';
import { FlexComponent } from '@ui/flex';
import { DirectivesModule } from '@directives/directives.module';
import { IconComponent } from '@ui/icon';

@Component({
  selector: 'app-objective-item',
  standalone: true,
  imports: [
    DirectivesModule,
    DivComponent,
    FlexComponent,
    IconComponent,
    JsonPipe,
    NgForOf,
    TextComponent,
  ],
  template: `
    <ui-flex class="Objective">
      {{ objective.title }} | {{ objective.position }}
    </ui-flex>
  `,
  styleUrls: ['./objective-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveItemComponent {
  @Input()
  @HostBinding('attr.blue-outline')
  blueOutline = false;

  @Input() objective!: Objective;
}
