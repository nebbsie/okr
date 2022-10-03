import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevConfigRoutingModule } from './dev-config-routing.module';
import { DevConfigComponent } from './dev-config.component';
import { ButtonModule } from '@core/ui/button';

@NgModule({
  declarations: [DevConfigComponent],
  imports: [CommonModule, DevConfigRoutingModule, ButtonModule],
})
export class DevConfigModule {}
