import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectiveCardListComponent } from './objective-card-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { DirectivesModule } from '@core/directives';
import { TextModule } from '@core/ui';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { KeyResultListModule } from '@core/components/key-result-list/key-result-list.module';
import { ObjectiveParentCardModule } from '@core/components/objective-parent-card/objective-parent-card.module';

@NgModule({
  declarations: [ObjectiveCardListComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule,
    DirectivesModule,
    TextModule,
    MatProgressBarModule,
    KeyResultListModule,
    ObjectiveParentCardModule,
  ],
  exports: [ObjectiveCardListComponent],
})
export class ObjectiveCardListModule {}
