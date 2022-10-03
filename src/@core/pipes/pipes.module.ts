import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OkrhubAsyncPipe } from '@core/pipes/okrhub-async.pipe';

@NgModule({
  declarations: [OkrhubAsyncPipe],
  imports: [CommonModule],
  exports: [OkrhubAsyncPipe],
})
export class PipesModule {}
