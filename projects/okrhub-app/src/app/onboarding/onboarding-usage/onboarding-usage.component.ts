import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserType } from '@services/store';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-usage',
  template: `
    <app-onboarding-template
      title="How do you plan to use okrhub?"
      subHeading="We will setup your account based on your decision."
      buttonText="Continue"
      [disabled]="!selected"
      [loading]="loading$ | Async"
      (next)="handleContinue()"
    >
      <ui-flex
        class="Choice"
        tabindex="1"
        direction="column"
        marginBottom="small"
        [class.Selected]="selected === UserType.PERSONAL"
        (click)="selected = UserType.PERSONAL"
      >
        <ui-icon>person</ui-icon>
        <ui-text weight="medium" marginBottom="xxxsmall" size="xmid">
          Personal
        </ui-text>
        <ui-text>Keep your personal projects organised and on track.</ui-text>
      </ui-flex>

      <ui-flex
        class="Choice"
        tabindex="2"
        direction="column"
        marginBottom="small"
        [class.Selected]="selected === UserType.TEAM"
        (click)="selected = UserType.TEAM"
      >
        <ui-icon>groups</ui-icon>
        <ui-text weight="medium" marginBottom="xxxsmall" size="xmid">
          Team
        </ui-text>
        <ui-text>Keep your personal projects organised and on track.</ui-text>
      </ui-flex>

      <ui-flex
        class="Choice"
        tabindex="3"
        direction="column"
        marginBottom="small"
        [class.Selected]="selected === UserType.COMPANY"
        (click)="selected = UserType.COMPANY"
      >
        <ui-icon>business</ui-icon>
        <ui-text weight="medium" marginBottom="xxxsmall" size="xmid">
          Company
        </ui-text>
        <ui-text>Keep your personal projects organised and on track.</ui-text>
      </ui-flex>
    </app-onboarding-template>
  `,
  styleUrls: ['./onboarding-usage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingUsageComponent {
  UserType = UserType;

  selected?: UserType.PERSONAL | UserType.TEAM | UserType.COMPANY;

  private loadingSubject$ = new BehaviorSubject(false);
  loading$ = this.loadingSubject$.asObservable();

  constructor(private router: Router) {}

  async handleContinue() {
    if (!this.selected) {
      return;
    }

    this.loadingSubject$.next(true);

    switch (this.selected) {
      case UserType.PERSONAL: {
        await this.router.navigate(['/onboarding/setup/personal']);
        break;
      }

      case UserType.TEAM: {
        await this.router.navigate(['/onboarding/setup/team']);
        break;
      }

      case UserType.COMPANY: {
        await this.router.navigate(['/onboarding/setup/company']);
        break;
      }
    }
  }
}
