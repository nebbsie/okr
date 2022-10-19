import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@core/services/store';
import { isEmail } from '@core/utils/validators';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-landing-blade',
  template: `
    <ui-text
      size="xxxlarge"
      sizeTablet="title"
      sizeDesktop="title"
      align="center"
      weight="bold"
      display="inline-block"
      transform="uppercase"
      marginBottom="large"
    >
      The Most Complete OKR Management Solution
    </ui-text>

    <ui-text
      size="large"
      sizeTablet="xlarge"
      display="inline-block"
      align="center"
      weight="medium"
      transform="uppercase"
      marginBottom="xxlarge"
      marginBottomTablet="xxxxlarge"
    >
      The perfect tool for teams or individuals.
    </ui-text>

    <ui-text
      size="large"
      sizeTablet="xlarge"
      display="inline-block"
      align="center"
      weight="medium"
      marginBottom="small"
    >
      Want early access? Sign up!
    </ui-text>

    <ui-flex class="EmailCollectSection" [center]="true" direction="column">
      <ui-input
        label="Enter your email address"
        submitAction="send"
        [loading]="isRequestingAccess$ | Async"
        [control]="earlyAccessEmailControl"
        (submit)="handleSubmitEarlyAccess()"
      ></ui-input>

      <ui-alert *ngIf="requestSuccess$ | Async" type="success">
        Thanks for your interest in okrhub. We will be in touch shortly for your
        early access.
      </ui-alert>

      <ui-alert *ngIf="requestError$ | Async" type="error">
        Thanks for your interest in okrhub. There was an issue when trying to
        request access. Try again or contact support.
      </ui-alert>
    </ui-flex>
  `,
  styleUrls: ['./landing-blade.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingBladeComponent {
  earlyAccessEmailControl = new FormControl<string | undefined>(undefined, [
    isEmail('Please provide an email address.'),
  ]);

  private isRequestingAccessSubject$ = new BehaviorSubject<boolean>(false);
  isRequestingAccess$ = this.isRequestingAccessSubject$.asObservable();

  private requestSuccessSubject$ = new BehaviorSubject<boolean>(false);
  requestSuccess$ = this.requestSuccessSubject$.asObservable();

  private requestErrorSubject$ = new BehaviorSubject<boolean>(false);
  requestError$ = this.requestErrorSubject$.asObservable();

  constructor(private store: Store) {}

  async handleSubmitEarlyAccess() {
    const email = this.earlyAccessEmailControl.value;
    if (!email) {
      return;
    }

    this.earlyAccessEmailControl.disable();
    this.isRequestingAccessSubject$.next(true);

    const result = this.store.create('earlyAccess', { email });
    await firstValueFrom(result.result$);
    await firstValueFrom(result.error$).then((err) => {
      this.earlyAccessEmailControl.enable();
      this.isRequestingAccessSubject$.next(false);

      this.requestErrorSubject$.next(!!err);
      this.requestSuccessSubject$.next(!err);

      if (!err) {
        this.earlyAccessEmailControl.reset(undefined);
      }
    });
  }
}
