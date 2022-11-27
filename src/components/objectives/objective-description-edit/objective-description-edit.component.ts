import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@directives/directives.module';
import { IconComponent } from '@ui/icon';
import { TextareaComponent } from '@ui/textarea';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-objective-description-edit',
  standalone: true,
  imports: [CommonModule, DirectivesModule, IconComponent, TextareaComponent],
  template: `
    <ui-icon class="Icon" marginRight="xxsmall">description</ui-icon>
    <ui-textarea
      [control]="control"
      [rows]="4"
      placeholder="Type description of the objective."
    ></ui-textarea>
  `,
  styleUrls: ['./objective-description-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveDescriptionEditComponent {
  @Input() control!: FormControl;
}
