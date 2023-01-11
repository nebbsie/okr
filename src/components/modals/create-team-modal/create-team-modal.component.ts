import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalComponent } from '@services/modal';
import {
  CreateTeamModalInput,
  CreateTeamModalOutput,
} from '@components/modals/create-team-modal/create-team-modal.types';
import { TeamsService } from '@services/collections/teams';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-team-modal',
  template: `
    <ui-text marginBottom="small" weight="medium" size="large">
      Create a new team
    </ui-text>

    <ui-text marginBottom="mid">
      A team is users to manage multiple OKR boards and users.
    </ui-text>

    <ui-input
      [control]="nameControl"
      marginBottom="small"
      label="Team name"
    ></ui-input>

    <ui-flex justify="space-between" align="center">
      <ui-button
        type="stroked"
        [disabled]="loadingCreatingTeam$ | Async"
        (click)="closeModal(undefined)"
      >
        Cancel
      </ui-button>
      <ui-button
        colour="primary"
        [loading]="loadingCreatingTeam$ | Async"
        (click)="handleCreateTeam()"
      >
        Create
      </ui-button>
    </ui-flex>
  `,
  styleUrls: ['./create-team-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTeamModalComponent extends ModalComponent<
  CreateTeamModalInput,
  CreateTeamModalOutput
> {
  nameControl = new FormControl<string | null>(null);

  private loadingCreatingTeamSubject$ = new BehaviorSubject<boolean>(false);
  loadingCreatingTeam$ = this.loadingCreatingTeamSubject$.asObservable();

  constructor(
    private teams: TeamsService,
    private localStorage: LocalStorageService
  ) {
    super();
  }

  async handleCreateTeam() {
    this.loadingCreatingTeamSubject$.next(true);
    console.log('starting');

    const workspaceId = await firstValueFrom(
      this.localStorage.get('selectedWorkspace')
    );
    if (!workspaceId) {
      // TODO: handle this, it shouldn't happen though as selectedWorkspace is
      // always set.
      this.loadingCreatingTeamSubject$.next(false);
      return;
    }

    const name = this.nameControl.value;
    if (!name) {
      // TODO: handle this.
      this.loadingCreatingTeamSubject$.next(false);
      return;
    }

    const teamCreateResult = await this.teams.createTeam(name, workspaceId);
    if (teamCreateResult.status === 'error') {
      // TODO: handle this.
      this.loadingCreatingTeamSubject$.next(false);
      return;
    }

    this.closeModal(teamCreateResult.id);
  }
}
