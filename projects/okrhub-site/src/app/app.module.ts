import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggedOutNavigationComponent } from '@components/logged-out-navigation';
import { FooterComponent } from '@components/footer';
import { CenterComponent } from '@ui/center/center.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterComponent,
    LoggedOutNavigationComponent,
    CenterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
