import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggedOutNavigationComponent } from '@components/logged-out-navigation';
import { FooterComponent } from '@components/footer';
import { FlexComponent } from '@ui/flex';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooterComponent,
    LoggedOutNavigationComponent,
    FlexComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
