import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsersService } from '@services/collections/users';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { required } from '@utils/validators';
import { WorkspacesService } from '@services/collections/workspaces';
import { TeamsService } from '@services/collections/teams';
import { BoardsService } from '@services/collections/boards';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/local-storage/local-storage.service';

@Component({
  selector: 'app-onboarding-setup-personal',
  template: `
    <app-onboarding-template
      title="Let's setup your personal account..."
      subHeading="We will create a customised workspace for you."
      buttonText="Finish Setup"
      [loading]="loading$ | Async"
      (next)="handleFinishSetup()"
    >
      <ui-input
        label="Workspace name"
        [control]="workspaceNameControl"
      ></ui-input>
    </app-onboarding-template>
  `,
  styleUrls: ['./onboarding-setup-personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingSetupPersonalComponent implements OnInit {
  @Input() workspaceNameControl = new FormControl<string | null>(null, [
    required('You must provide a name for your workspace.'),
  ]);

  private loadingSubject$ = new BehaviorSubject(false);
  loading$ = this.loadingSubject$.asObservable();

  constructor(
    private users: UsersService,
    private workspaces: WorkspacesService,
    private teams: TeamsService,
    private boards: BoardsService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    firstValueFrom(this.users.getCurrentUser().value$).then((user) => {
      this.workspaceNameControl.setValue(`${user?.fullName}'s workspace`);
    });
  }

  async handleFinishSetup() {
    const user = await firstValueFrom(this.users.getCurrentUser().value$);
    if (!user) {
      // TODO: handle it.
      return;
    }

    const workspaceName = this.workspaceNameControl.value;
    if (!workspaceName) {
      // TODO: handle it.
      return;
    }

    this.loadingSubject$.next(true);

    // Create a workspace.
    const workspaceResult = await this.workspaces.createWorkspace(
      workspaceName
    );
    if (workspaceResult.status === 'error') {
      // TODO: handle it.
      return;
    }

    // Create a team.
    const teamResult = await this.teams.createTeam(
      `${user.fullName}'s Team`,
      workspaceResult.id
    );
    if (teamResult.status === 'error') {
      // TODO: handle it.
      return;
    }

    // Create a board on that team.
    const boardsResult = await this.boards.createBoard(
      `Personal`,
      teamResult.id
    );
    if (boardsResult.status === 'error') {
      // TODO: handle it.
      return;
    }

    // Set the user as setup.
    await firstValueFrom(
      this.users.updateCurrentUser({
        isSetup: true,
      }).value$
    );

    // Set the first created team to the selected team for the user.
    this.localStorage.set('selectedTeam', teamResult.id);

    await this.router.navigate(['/']);
  }
}
