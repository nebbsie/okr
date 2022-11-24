import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { PageComponent } from '@ui/page';
import { TextComponent } from '@ui/text';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    PageComponent,
    TextComponent,
    PipesModule,
  ],
})
export class BoardModule {}
