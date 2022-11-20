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
import { NgForOf, NgIf, SlicePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { AvatarComponent } from '@ui/avatar';
import { LinkComponent } from '@ui/link';
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
  ],
})
export class SideBarModule {}
