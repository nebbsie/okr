import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { LandingBladeComponent } from './landing-blade/landing-blade.component';
import { LandingVideoComponent } from './landing-video/landing-video.component';
import { DirectivesModule } from '@directives/directives.module';
import { CenterComponent } from '@ui/center/center.component';
import { TextComponent } from '@ui/text';

@NgModule({
  declarations: [
    LandingComponent,
    LandingBladeComponent,
    LandingVideoComponent,
  ],
  imports: [
    LandingRoutingModule,
    DirectivesModule,
    TextComponent,
    CenterComponent,
  ],
  exports: [LandingComponent],
})
export class LandingModule {}
