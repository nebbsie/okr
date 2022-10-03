import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LandingRoutingModule } from "./landing-routing.module";
import { LandingComponent } from "./landing.component";
import { LinkModule } from "@core/ui/link";

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, LandingRoutingModule, LinkModule],
})
export class LandingModule {}
