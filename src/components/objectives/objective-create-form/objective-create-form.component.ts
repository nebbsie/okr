import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { FlexComponent } from '@ui/flex';
import { IconComponent } from '@ui/icon';
import { DirectivesModule } from '@directives/directives.module';
import { TextComponent } from '@ui/text';
import { TextareaComponent } from '@ui/textarea';
import { ButtonComponent } from '@ui/button';
import { FormControl } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ObjectivesCollection, Store } from '@services/store';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { PipesModule } from '@pipes/pipes.module';
import { ObjectiveNameEditComponent } from '@components/objectives/objective-name-edit/objective-name-edit.component';
import { ObjectiveDescriptionEditComponent } from '@components/objectives/objective-description-edit/objective-description-edit.component';

@Component({
  selector: 'app-objective-create-form',
  standalone: true,
  imports: [
    ButtonComponent,
    DirectivesModule,
    FlexComponent,
    IconComponent,
    NgIf,
    PipesModule,
    TextareaComponent,
    TextComponent,
    ObjectiveNameEditComponent,
    ObjectiveDescriptionEditComponent,
  ],
  template: `
    <ng-container *ngIf="!clicked">
      <ui-icon marginRight="small">add</ui-icon>
      <ui-text [unselectable]="true">Add objective</ui-text>
    </ng-container>

    <ui-flex *ngIf="clicked" direction="column" [fullWidth]="true">
      <app-objective-name-edit
        marginBottom="mid"
        [control]="titleControl"
      ></app-objective-name-edit>

      <app-objective-description-edit
        marginBottom="mid"
        [control]="descControl"
      ></app-objective-description-edit>

      <ui-flex justify="flex-end" [fullWidth]="true">
        <ui-button
          type="stroked"
          marginRight="small"
          [fullWidth]="true"
          [disabled]="loading$ | Async"
          [fullWidthTablet]="false"
          (click)="cancelClicked()"
        >
          Cancel
        </ui-button>
        <ui-button
          colour="primary"
          [fullWidth]="true"
          [loading]="loading$ | Async"
          [fullWidthTablet]="false"
          (click)="saveClicked()"
        >
          Save
        </ui-button>
      </ui-flex>
    </ui-flex>
  `,
  styleUrls: ['./objective-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveCreateFormComponent {
  @Input() lastBoardPosition$!: Observable<number | undefined>;
  @Input() boardId$!: Observable<string>;

  @HostBinding('attr.clicked')
  clicked = false;

  private loadingSubject$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject$.asObservable();

  titleControl = new FormControl<string | null>(null);
  descControl = new FormControl<string | null>(null);

  constructor(private elementRef: ElementRef, private store: Store) {}

  @HostListener('document:click', ['$event'])
  handleClickDOM(event: PointerEvent): void {
    if (this.elementRef.nativeElement.contains(event.target)) {
      if (!this.clicked) {
        this.clicked = true;
        setTimeout(() => {
          this.elementRef.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }, 0);
      }
    } else {
      this.clicked = false;
    }
  }

  cancelClicked(): void {
    this.titleControl.setValue(null);
    this.descControl.setValue(null);
    this.clicked = false;
  }

  async saveClicked() {
    const boardId = await firstValueFrom(this.boardId$);
    const lastBoardPosition = await firstValueFrom(this.lastBoardPosition$);

    const title = this.titleControl.value;
    if (!title || !boardId) {
      return;
    }

    this.clicked = false;
    this.loadingSubject$.next(true);

    const createResult = this.store.create<ObjectivesCollection>('objectives', {
      title,
      boardId,
      keyResults: [],
      position: (lastBoardPosition ?? 0) + 10000,
    });

    firstValueFrom(createResult.value$).then(() => {
      this.loadingSubject$.next(false);
      this.titleControl.setValue(null);
      this.descControl.setValue(null);
    });
  }
}
