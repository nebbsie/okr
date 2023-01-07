import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DivComponent } from '@ui/div';
import { IconComponent } from '@ui/icon';
import { KeyResultNameEditComponent } from '@components/key-results/key-result-name-edit/key-result-name-edit.component';
import { FlexComponent } from '@ui/flex';
import { MoreOptionsComponent } from '@components/more-options/more-options.component';
import { MoreOptionsItemComponent } from '@components/more-options-item/more-options-item.component';
import { ButtonComponent } from '@ui/button';
import { DirectivesModule } from '@directives/directives.module';
import {
  KeyResultCollection,
  MinimalKeyResult,
  Objective,
  ObjectivesCollection,
  Store,
} from '@services/store';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { PipesModule } from '@pipes/pipes.module';

@Component({
  selector: 'app-key-result-create-form',
  standalone: true,
  imports: [
    DivComponent,
    IconComponent,
    KeyResultNameEditComponent,
    FlexComponent,
    MoreOptionsComponent,
    MoreOptionsItemComponent,
    ButtonComponent,
    DirectivesModule,
    PipesModule,
  ],
  template: `
    <ui-icon>subdirectory_arrow_right</ui-icon>
    <ui-flex
      class="Container"
      direction="column"
      align="center"
      justify="space-between"
      [fullWidth]="true"
    >
      <app-key-result-name-edit
        [control]="titleControl"
        marginBottom="mid"
      ></app-key-result-name-edit>

      <ui-flex justify="flex-end" [fullWidth]="true">
        <ui-button
          type="stroked"
          marginRight="small"
          [disabled]="loading$ | Async"
          [fullWidth]="true"
          [fullWidthTablet]="false"
          (click)="closed.emit()"
        >
          Cancel
        </ui-button>
        <ui-button
          colour="primary"
          [loading]="loading$ | Async"
          [fullWidth]="true"
          [fullWidthTablet]="false"
          (click)="create()"
        >
          Save
        </ui-button>
      </ui-flex>
    </ui-flex>
  `,
  styleUrls: ['./key-result-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyResultCreateFormComponent {
  @Input() objective!: Objective;
  @Output() closed = new EventEmitter<void>();

  titleControl = new FormControl<string | null>(null);

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject$.asObservable();

  constructor(private store: Store) {}

  async create() {
    if (!this.titleControl.value) {
      return;
    }

    this.loadingSubject$.next(true);

    const keyResultResult = this.store.create<KeyResultCollection>(
      'keyResults',
      {
        title: this.titleControl.value,
        objectiveId: this.objective.id,
      }
    );

    const keyResultId = await firstValueFrom(keyResultResult.value$);
    if (!keyResultId) {
      // TODO: no key result value.
      this.loadingSubject$.next(false);
      return;
    }

    const lastKeyResultPosition =
      this.objective.keyResults[this.objective.keyResults.length - 1]
        ?.position ?? 0;

    const currentKeyResults = this.objective.keyResults;
    const newKeyResults: MinimalKeyResult[] = [
      ...currentKeyResults,
      {
        id: keyResultId,
        name: this.titleControl.value,
        position: lastKeyResultPosition + 1000,
      },
    ];

    const objectiveUpdateResult = this.store.update<ObjectivesCollection>(
      'objectives',
      this.objective.id,
      {
        keyResults: newKeyResults,
      }
    );

    const objectiveUpdate = await firstValueFrom(objectiveUpdateResult.value$);

    this.closed.emit();
    this.loadingSubject$.next(false);
    console.log(objectiveUpdate);
  }
}
