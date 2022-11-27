import { NgModule } from '@angular/core';
import { SideBarComponent } from './side-bar.component';
import { SideBarAccountComponent } from './side-bar-account/side-bar-account.component';
import { SideBarItemComponent } from './side-bar-item/side-bar-item.component';
import { SideBarTeamSelectComponent } from './side-bar-team-select/side-bar-team-select.component';
import { DirectivesModule } from '@directives/directives.module';
import { FlexComponent } from '@ui/flex';
import { MatMenuModule } from '@angular/material/menu';
import { IconComponent } from '@ui/icon';
import { TextComponent } from '@ui/text';
import { PipesModule } from '@pipes/pipes.module';
import { JsonPipe, NgForOf, NgIf, SlicePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { AvatarComponent } from '@ui/avatar';
import { LinkComponent } from '@ui/link';
import { ModalModule } from '@services/modal/modal.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AlertComponent } from '@ui/alert';
import { SpinnerComponent } from '@ui/spinner/spinner.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SideBarBoardsComponent } from './side-bar-boards/side-bar-boards.component';
import { SideBarBoardMenuComponent } from './side-bar-board-menu/side-bar-board-menu.component';
import { SideBarTeamNavComponent } from './side-bar-team-nav/side-bar-team-nav.component';

@NgModule({
  declarations: [
    SideBarComponent,
    SideBarAccountComponent,
    SideBarItemComponent,
    SideBarTeamSelectComponent,
    SideBarBoardsComponent,
    SideBarBoardMenuComponent,
    SideBarTeamNavComponent,
  ],
  exports: [SideBarComponent],
  imports: [
    DirectivesModule,
    FlexComponent,
    MatMenuModule,
    IconComponent,
    TextComponent,
    PipesModule,
    NgIf,
    MatDividerModule,
    NgForOf,
    AvatarComponent,
    LinkComponent,
    SlicePipe,
    ModalModule,
    RouterLink,
    RouterLinkActive,
    AlertComponent,
    SpinnerComponent,
    MatTooltipModule,
    JsonPipe,
  ],
})
export class SideBarModule {}
