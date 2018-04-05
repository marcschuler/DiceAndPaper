import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {DiceDataProvider} from '../../providers/dice-data/dice-data';
import {HomePage} from '../home/home';
/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  name:string="Doctor";
  profileExample;

  constructor(public navCtrl: NavController, public navParams: NavParams,public data:DiceDataProvider) {
 	this.profileExample=JSON.parse('{"name":"Simple W6","dices":[{"value":6}]}');
  }

  start(){
  	this.data.setName(this.name);
  	this.navCtrl.pop();
  }

}
