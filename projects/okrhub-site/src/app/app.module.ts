import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CenterModule } from '@ui/center/center.module';
import {
  LoggedOutNavigationComponent,
  LoggedOutNavigationModule,
} from '@components/logged-out-navigation';
import { FooterComponent } from '@components/footer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CenterModule,
    LoggedOutNavigationModule,
    FooterComponent,
    LoggedOutNavigationComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
