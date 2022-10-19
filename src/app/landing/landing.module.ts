import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import {
  AlertModule,
  ButtonModule,
  LinkModule,
  PageModule,
  TextModule,
} from '@core/ui';
import { LoggedOutNavigationModule } from '@core/components/logged-out-navigation';
import { CenterModule } from '@core/ui/center/center.module';
import { LandingBladeComponent } from './landing-blade/landing-blade.component';
import { DirectivesModule } from '@core/directives';
import { InputModule } from '@core/ui/input';
import { LandingVideoComponent } from './landing-video/landing-video.component';
import { PipesModule } from '@core/pipes';
import { FlexModule } from '@core/ui/flex';

@NgModule({
  declarations: [
    LandingComponent,
    LandingBladeComponent,
    LandingVideoComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    LinkModule,
    LoggedOutNavigationModule,
    PageModule,
    TextModule,
    CenterModule,
    DirectivesModule,
    InputModule,
    ButtonModule,
    PipesModule,
    AlertModule,
    FlexModule,
  ],
})
export class LandingModule {}
