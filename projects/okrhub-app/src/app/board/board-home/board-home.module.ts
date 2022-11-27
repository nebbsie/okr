import { NgModule } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { BoardHomeRoutingModule } from './board-home-routing.module';
import { BoardHomeComponent } from './board-home.component';
import { MatCardModule } from '@angular/material/card';
import { TextComponent } from '@ui/text';
import { IconComponent } from '@ui/icon';
import { DirectivesModule } from '@directives/directives.module';
import { InputComponent } from '@ui/input';
import { ButtonComponent } from '@ui/button';
import { FlexComponent } from '@ui/flex';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '@ui/textarea/textarea.component';
import { ObjectiveCreateFormComponent } from '@components/objectives/objective-create-form/objective-create-form.component';
import { PipesModule } from '@pipes/pipes.module';
import { DivComponent } from '@ui/div';
import { ObjectiveItemComponent } from '@components/objectives/objective-item/objective-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ObjectiveItemDropAreaComponent } from '@components/objectives/objective-item-drop-area/objective-item-drop-area.component';

@NgModule({
  declarations: [BoardHomeComponent],
  imports: [
    CommonModule,
    BoardHomeRoutingModule,
    MatCardModule,
    TextComponent,
    IconComponent,
    DirectivesModule,
    InputComponent,
    ButtonComponent,
    FlexComponent,
    ReactiveFormsModule,
    TextareaComponent,
    ObjectiveCreateFormComponent,
    PipesModule,
    DivComponent,
    NgForOf,
    ObjectiveItemComponent,
    DragDropModule,
    ObjectiveItemDropAreaComponent,
  ],
})
export class BoardHomeModule {}
