import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {HttpModule} from '@angular/http';
import {JsonpModule} from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ProfilesPage } from '../pages/profiles/profiles';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {HistoryPage} from '../pages/history/history';

import {ProfilecreatorPage} from '../pages/profilecreator/profilecreator';

import {ErrorPageComponent} from '../components/error-page/error-page';
import {DiceComponent} from '../components/dice/dice';
import {DiceProfileComponent} from '../components/dice-profile/dice-profile';

import {OnlinePage} from '../pages/online/online';
import {WelcomePage} from '../pages/welcome/welcome';

import {DeviceMotion} from '@ionic-native/device-motion';
import {Vibration} from '@ionic-native/vibration';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DiceDataProvider } from '../providers/dice-data/dice-data';
import { OnlineProvider } from '../providers/online/online';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProfilesPage,
    HomePage,
    TabsPage,
    OnlinePage,
    ProfilecreatorPage,
    DiceComponent,
    DiceProfileComponent,
    HistoryPage,
    ErrorPageComponent,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
	JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProfilesPage,
    HomePage,
    TabsPage,
    ProfilecreatorPage,
    OnlinePage,
    HistoryPage,
    ErrorPageComponent,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DiceDataProvider,
    OnlineProvider,
    DeviceMotion,
    Vibration
  ]
})
export class AppModule {}
