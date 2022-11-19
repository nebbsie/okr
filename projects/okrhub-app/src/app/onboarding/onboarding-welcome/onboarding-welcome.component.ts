import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { required } from '@utils/validators';
import { Router } from '@angular/router';
import {
  MinimalBoard,
  MinimalTeam,
  MinimalWorkspace,
  Store,
  UserType,
} from '@services/store';
import { AuthService } from '@services/auth';
import { UsersService } from '../../../../../../src/services/collections/users';

@Component({
  selector: 'app-onboarding-welcome',
  template: `
    <app-onboarding-template
      title="Welcome! Lets set things up."
      subHeading="Don't worry. These can be changed later."
      buttonText="Continue"
      [disabled]="fullNameControl.invalid"
      [loading]="loading$ | Async"
      (next)="handleContinue()"
    >
      <ui-input [control]="fullNameControl" label="Full Name"></ui-input>
    </app-onboarding-template>
  `,
  styleUrls: ['./onboarding-welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingWelcomeComponent {
  private loadingSubject$ = new BehaviorSubject(false);
  loading$ = this.loadingSubject$.asObservable();

  fullNameControl = new FormControl<string | null>(null, [
    required('You must provide your name.'),
  ]);

  constructor(
    private store: Store,
    private router: Router,
    private auth: AuthService,
    private users: UsersService
  ) {}

  async handleContinue() {
    const fullName = this.fullNameControl.value;
    if (fullName === null) {
      return;
    }

    this.loadingSubject$.next(true);

    const userId = await firstValueFrom(this.auth.getUserId());

    const updateResult = this.users.createUser({
      avatarUrl: undefined,
      fullName,
      id: userId,
      isSetup: false,
      joinedBoards: new Map<string, MinimalBoard>(),
      joinedTeams: new Map<string, MinimalTeam>(),
      joinedWorkspaces: new Map<string, MinimalWorkspace>(),
      type: UserType.UNSELECTED,
    });

    firstValueFrom(updateResult.value$).then(async () => {
      this.loadingSubject$.next(false);
      await this.router.navigate(['/onboarding/usage']);
    });
  }
}
