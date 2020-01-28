import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EFFECTS } from './store/effects';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { NgrxRouterStoreModule } from './store/router/ngrx-router.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),

    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),

    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(EFFECTS),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgrxRouterStoreModule,
    AppRoutingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
