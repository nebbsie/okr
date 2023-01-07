import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileBoardsRoutingModule } from './mobile-boards-routing.module';
import { MobileBoardsComponent } from './mobile-boards.component';
import { PageComponent } from '@ui/page';
import { TextComponent } from '@ui/text';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [MobileBoardsComponent],
  imports: [
    CommonModule,
    MobileBoardsRoutingModule,
    PageComponent,
    TextComponent,
    PipesModule,
  ],
})
export class MobileBoardsModule {}
