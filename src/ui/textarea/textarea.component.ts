import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { DirectivesModule } from '@directives/directives.module';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [ReactiveFormsModule, A11yModule, DirectivesModule],
  template: `
    <textarea
      class="TextArea"
      [autoFocus]="autofocus"
      [formControl]="control"
      [placeholder]="placeholder"
      [rows]="rows"
    ></textarea>
  `,
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  @Input() rows = 1;
  @Input() control!: FormControl;
  @Input() placeholder!: string;
  @Input() autofocus?: boolean;
}
