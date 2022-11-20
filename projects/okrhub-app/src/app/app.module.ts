import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@env/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobileBottomBarComponent } from '@components/mobile-bottom-bar';
import { DirectivesModule } from '@directives/directives.module';
import { SideBarModule } from '@components/side-bar';
import { PipesModule } from '@pipes/pipes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    DirectivesModule,
    PipesModule,
    SideBarModule,
    MobileBottomBarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
