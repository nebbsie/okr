import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectiveParentCardComponent } from './objective-parent-card.component';
import { MatIconModule } from '@angular/material/icon';
import { TextModule } from '@core/ui';
import { DirectivesModule } from '@core/directives';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ObjectiveParentCardComponent],
  imports: [
    CommonModule,
    MatIconModule,
    TextModule,
    DirectivesModule,
    DragDropModule,
    MatProgressBarModule,
  ],
  exports: [ObjectiveParentCardComponent],
})
export class ObjectiveParentCardModule {}
