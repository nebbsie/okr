import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <textarea
      class="TextArea"
      autofocus
      [rows]="rows"
      [placeholder]="placeholder"
      [formControl]="control"
    ></textarea>
  `,
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() rows = 1;
  @Input() control!: FormControl;
  @Input() placeholder!: string;
}
