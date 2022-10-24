import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { LandingBladeComponent } from './landing-blade/landing-blade.component';
import { LandingVideoComponent } from './landing-video/landing-video.component';
import { LoggedOutNavigationModule } from '@components/logged-out-navigation';
import { LinkModule } from '@ui/link';
import { PageModule } from '@ui/page';
import { TextModule } from '@ui/text';
import { CenterModule } from '@ui/center/center.module';
import { DirectivesModule } from '@directives/directives.module';
import { InputModule } from '@ui/input';
import { ButtonModule } from '@ui/button';
import { PipesModule } from '@pipes/pipes.module';
import { AlertModule } from '@ui/alert';
import { FlexModule } from '@ui/flex';

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
  exports: [LandingComponent],
})
export class LandingModule {}
