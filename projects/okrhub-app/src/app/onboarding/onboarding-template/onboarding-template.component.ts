import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-onboarding-template',
  template: `
    <ui-text weight="bold" size="xlarge" marginBottom="xxxsmall">
      {{ title }}
    </ui-text>

    <ui-text marginBottom="large" colour="mid">
      {{ subHeading }}
    </ui-text>

    <ng-content></ng-content>

    <ui-button
      class="ContinueButton"
      [loading]="loading"
      colour="primary"
      [fullWidth]="true"
      [disabled]="disabled"
      (click)="next.emit()"
    >
      {{ buttonText }}
    </ui-button>
  `,
  styleUrls: ['./onboarding-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingTemplateComponent {
  @Input() title!: string;
  @Input() subHeading!: string;
  @Input() buttonText!: string;

  @Input() disabled?: boolean;
  @Input() loading?: boolean;
  @Output() next = new EventEmitter<void>();
}
