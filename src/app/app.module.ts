import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@env/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobileBottomBarModule } from '@core/components/mobile-bottom-bar';
import { DirectivesModule } from '@core/directives';
import { PipesModule } from '@core/pipes';
import { LoggedOutNavigationModule } from '@core/components/logged-out-navigation';
import { CenterModule } from '@core/ui/center/center.module';
import { FooterModule } from '@core/components/footer/footer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    MobileBottomBarModule,
    DirectivesModule,
    PipesModule,
    LoggedOutNavigationModule,
    CenterModule,
    FooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
