import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { PageComponent } from '@ui/page';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, PageComponent],
})
export class ProfileModule {}
