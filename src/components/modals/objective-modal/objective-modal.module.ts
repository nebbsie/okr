import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectiveModalComponent } from './objective-modal.component';
import { IconComponent } from '@ui/icon';
import { FlexComponent } from '@ui/flex';
import { ObjectiveNameEditComponent } from '@components/objectives/objective-name-edit/objective-name-edit.component';
import { ObjectiveDescriptionEditComponent } from '@components/objectives/objective-description-edit/objective-description-edit.component';
import { DirectivesModule } from '@directives/directives.module';
import { ModalHeaderComponent } from '@components/modal-header';
import { PipesModule } from '@pipes/pipes.module';
import { SpinnerComponent } from '@ui/spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ObjectiveModalComponent],
  imports: [
    CommonModule,
    IconComponent,
    FlexComponent,
    ObjectiveNameEditComponent,
    ObjectiveDescriptionEditComponent,
    DirectivesModule,
    ModalHeaderComponent,
    PipesModule,
    SpinnerComponent,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class ObjectiveModalModule {}
