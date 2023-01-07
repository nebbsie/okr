import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { DivComponent } from '@ui/div';

@Component({
  selector: 'app-objective-item-drop-area',
  standalone: true,
  imports: [JsonPipe, DivComponent],
  template: ``,
  styleUrls: ['./objective-item-drop-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveItemDropAreaComponent {}
