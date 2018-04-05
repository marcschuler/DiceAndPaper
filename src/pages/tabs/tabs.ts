import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ProfilesPage } from '../profiles/profiles';
import { HomePage } from '../home/home';
import {OnlinePage} from '../online/online';
import {WelcomePage} from '../welcome/welcome';

import {DiceDataProvider} from '../../providers/dice-data/dice-data';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilesPage;
  tab3Root = OnlinePage;
  tab4Root = AboutPage;

  constructor(data:DiceDataProvider,navCtrl:NavController) {
	if (data.getName()==""){
	  navCtrl.push(WelcomePage);
	}
  }
}
