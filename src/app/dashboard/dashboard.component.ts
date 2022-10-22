import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services';
import { firstValueFrom, Observable } from 'rxjs';
import {
  KeyResultCollection,
  ObjectivesCollection,
  Store,
} from '@core/services/store';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-top-bar title="Dashboard"> </app-top-bar>

    <ui-page [center]="true" contentDirection="column">
      <ui-button (click)="createObjective()">Create objective</ui-button>
    </ui-page>
  `,
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  usersId$!: Observable<string>;

  constructor(private auth: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.usersId$ = this.auth.getUserId();
  }

  async createObjective() {
    const titleForKeyResult = 'My Key Result';

    const keyResultId = await firstValueFrom(
      this.store.create<KeyResultCollection>('keyResults', {
        title: titleForKeyResult,
      }).result$
    );
    if (!keyResultId) {
      console.error('lol');
      return;
    }

    await firstValueFrom(
      this.store.create<ObjectivesCollection>('objectives', {
        title: 'Aaron',
        keyResults: [
          {
            name: titleForKeyResult,
            id: keyResultId,
          },
        ],
      }).result$
    );
  }
}
