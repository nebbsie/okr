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
import { MoreOptionsComponent } from '@components/more-options/more-options.component';
import { MoreOptionsItemComponent } from '@components/more-options-item/more-options-item.component';

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
    MoreOptionsComponent,
    MoreOptionsItemComponent,
  ],
  template: `
    <ui-text>{{ objective.title }}</ui-text>

    <app-more-options>
      <app-more-options-item icon="add"> Add Key Result </app-more-options-item>
    </app-more-options>
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
