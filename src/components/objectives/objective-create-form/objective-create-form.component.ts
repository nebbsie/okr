import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FlexComponent } from '@ui/flex';
import { IconComponent } from '@ui/icon';
import { DirectivesModule } from '@directives/directives.module';
import { TextComponent } from '@ui/text';
import { TextareaComponent } from '@ui/textarea/textarea.component';
import { ButtonComponent } from '@ui/button';
import { FormControl } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-objective-create-form',
  standalone: true,
  imports: [
    FlexComponent,
    IconComponent,
    DirectivesModule,
    TextComponent,
    TextareaComponent,
    ButtonComponent,
    NgIf,
  ],
  template: `
    <ui-flex
      class="EmptyObjective"
      align="center"
      [class.Active]="clicked"
      (click)="clicked = true"
    >
      <ng-container *ngIf="!clicked">
        <ui-icon marginRight="small">add</ui-icon>
        <ui-text [unselectable]="true">Add objective</ui-text>
      </ng-container>

      <ui-flex *ngIf="clicked" direction="column" [fullWidth]="true">
        <ui-flex align="center" marginBottom="mid">
          <ui-icon marginRight="xxsmall">local_offer</ui-icon>
          <ui-textarea
            [control]="nameControl"
            [rows]="1"
            placeholder="Type name of the objective."
          ></ui-textarea>
        </ui-flex>

        <ui-flex marginBottom="mid">
          <ui-icon marginRight="xxsmall">description</ui-icon>
          <ui-textarea
            [control]="nameControl"
            [rows]="4"
            placeholder="Type description of the objective."
          ></ui-textarea>
        </ui-flex>

        <ui-flex [fullWidth]="true" justify="flex-end">
          <ui-button
            type="stroked"
            marginRight="mid"
            [fullWidth]="true"
            [fullWidthTablet]="false"
            (click)="cancelClicked($event)"
          >
            Cancel
          </ui-button>
          <ui-button
            colour="primary"
            [fullWidth]="true"
            [fullWidthTablet]="false"
            (click)="saveClicked($event)"
          >
            Save
          </ui-button>
        </ui-flex>
      </ui-flex>
    </ui-flex>
  `,
  styleUrls: ['./objective-create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveCreateFormComponent {
  clicked = false;

  nameControl = new FormControl<string | null>(null);

  constructor(private ref: ChangeDetectorRef) {}

  cancelClicked(event: MouseEvent): void {
    event.stopPropagation();
    this.nameControl.setValue(null);
    this.clicked = false;
  }

  saveClicked(event: MouseEvent): void {
    event.stopPropagation();
    this.nameControl.setValue(null);
    this.clicked = false;
    this.ref.detectChanges();
  }
}
