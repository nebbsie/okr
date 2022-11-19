import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '@ui/avatar/avatar.component';
import { PipesModule } from '@pipes/pipes.module';
import { TextModule } from '@ui/text';

@NgModule({
  declarations: [AvatarComponent],
  imports: [CommonModule, PipesModule, TextModule],
  exports: [AvatarComponent],
})
export class AvatarModule {}
