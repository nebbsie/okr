import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardHomeRoutingModule } from './board-home-routing.module';
import { BoardHomeComponent } from './board-home.component';
import { MatCardModule } from '@angular/material/card';
import { TextComponent } from '@ui/text';
import { IconComponent } from '@ui/icon';
import { DirectivesModule } from '@directives/directives.module';
import { InputComponent } from '@ui/input';
import { ButtonComponent } from '@ui/button';
import { FlexComponent } from '@ui/flex';
import { A11yModule } from '@angular/cdk/a11y';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '@ui/textarea/textarea.component';
import { ObjectiveCreateFormComponent } from '@components/objectives/objective-create-form/objective-create-form.component';

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
    A11yModule,
    ReactiveFormsModule,
    TextareaComponent,
    ObjectiveCreateFormComponent,
  ],
})
export class BoardHomeModule {}
