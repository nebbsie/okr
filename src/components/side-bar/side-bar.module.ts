import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar.component';
import { ButtonModule } from '@ui/button';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TextModule } from '@ui/text';
import { IconModule } from '@ui/icon';
import { AvatarModule } from '@ui/avatar/avatar.module';
import { MatDividerModule } from '@angular/material/divider';
import { PipesModule } from '@pipes/pipes.module';
import { SideBarAccountComponent } from './side-bar-account/side-bar-account.component';
import { FlexModule } from '@ui/flex';
import { DirectivesModule } from '@directives/directives.module';
import { LinkModule } from '@ui/link';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SideBarItemComponent } from './side-bar-item/side-bar-item.component';
import { SideBarTeamSelectComponent } from './side-bar-team-select/side-bar-team-select.component';
import { ModalModule } from '@services/modal/modal.module';

@NgModule({
  declarations: [
    SideBarComponent,
    SideBarAccountComponent,
    SideBarItemComponent,
    SideBarTeamSelectComponent,
  ],
  exports: [SideBarComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MatButtonModule,
    MatMenuModule,
    TextModule,
    IconModule,
    AvatarModule,
    MatDividerModule,
    PipesModule,
    FlexModule,
    DirectivesModule,
    LinkModule,
    MatTooltipModule,
    RouterModule,
    ModalModule,
  ],
})
export class SideBarModule {}
