import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalComponent } from '@services/modal';
import {
  CreateTeamModalInput,
  CreateTeamModalOutput,
} from '@components/modals/create-team-modal/create-team-modal.types';
import { TeamsService } from '@services/collections/teams';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { firstValueFrom } from 'rxjs';

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
      <ui-button type="stroked" (click)="closeModal(undefined)">
        Cancel
      </ui-button>
      <ui-button colour="primary" (click)="handleCreateTeam()"
        >Create</ui-button
      >
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

  constructor(
    private teams: TeamsService,
    private localStorage: LocalStorageService
  ) {
    super();
  }

  ngOnInit(): void {}

  async handleCreateTeam() {
    const workspaceId = await firstValueFrom(
      this.localStorage.get('selectedWorkspace')
    );
    if (!workspaceId) {
      // TODO: handle this.
      return;
    }

    const name = this.nameControl.value;
    if (!name) {
      // TODO: handle this.
      return;
    }

    const teamCreateResult = await this.teams.createTeam(name, workspaceId);
    if (teamCreateResult.status === 'error') {
      // TODO: handle this.
      return;
    }

    this.closeModal(teamCreateResult.id);
  }
}
