import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@ui/icon';
import { DirectivesModule } from '@directives/directives.module';
import { TextareaComponent } from '@ui/textarea';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-objective-name-edit',
  standalone: true,
  imports: [CommonModule, IconComponent, DirectivesModule, TextareaComponent],
  template: `
    <ui-icon colour="mid" marginRight="xxsmall">local_offer</ui-icon>
    <ui-textarea
      [control]="control"
      [autofocus]="true"
      [rows]="1"
      placeholder="Type name of the objective."
    ></ui-textarea>
  `,
  styleUrls: ['./objective-name-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveNameEditComponent {
  @Input() control!: FormControl;
}
