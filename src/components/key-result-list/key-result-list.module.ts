import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyResultListComponent } from './key-result-list.component';
import { TextModule } from '../../ui';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DirectivesModule } from '../../directives';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [KeyResultListComponent],
  imports: [
    CommonModule,
    TextModule,
    DragDropModule,
    DirectivesModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  exports: [KeyResultListComponent],
})
export class KeyResultListModule {}
