import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TextareaComponent } from '@ui/textarea';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-key-result-name-edit',
  standalone: true,
  imports: [TextareaComponent],
  template: `
    <ui-textarea
      [control]="control"
      [autofocus]="true"
      [rows]="1"
      placeholder="Type name of the key result."
    ></ui-textarea>
  `,
  styleUrls: ['./key-result-name-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyResultNameEditComponent {
  @Input() control!: FormControl;
}
