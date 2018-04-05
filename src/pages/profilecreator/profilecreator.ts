import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController} from 'ionic-angular';


import {DiceDataProvider} from '../../providers/dice-data/dice-data';
/**
 * Generated class for the ProfilecreatorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profilecreator',
  templateUrl: 'profilecreator.html',
})
export class ProfilecreatorPage {
  
  diceOptions:any = [2,6,8,10,12,20,100];
  
  name:string;
  dices:any = [];
  
  addableDice:any;

  constructor(public data : DiceDataProvider,public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController) {
    this.name = "New profile";
  }
  
  removeDice(index){
    console.log("creator : removing index " + index + " (" + this.dices[index] + ")");
    this.dices.splice(index,1);
  }
  
  addDice(value){
  	this.dices.push(value);
  }
  
  save(){
  	if (!this.dices.length){
  		this.toastCtrl.create({
   	   message: 'You can\'t create an empty profile...',
   	   duration: 3000
   	 }).present();
   	 return;
  	}
    var profiles = this.data.getProfiles();
    
    var profile = {
      name : this.name,
      dices:[]
    }
    for(let dice of this.dices){
      profile.dices.push({
        value: dice
      });
    }
    
    profiles.push(profile);
    this.data.saveProfiles(profiles);
    //then exit
    this.navCtrl.pop();
    
    this.toastCtrl.create({
      message: 'You created a profile  "' + profile.name + '"',
      duration: 3000
    }).present();
  }

  ionViewDidLoad() {
  }

}
