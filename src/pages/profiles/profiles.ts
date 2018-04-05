import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {DiceDataProvider} from '../../providers/dice-data/dice-data';
import { ProfilecreatorPage } from '../profilecreator/profilecreator';

import {ToastController} from 'ionic-angular';


@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html'
})
export class ProfilesPage {
  
  data: DiceDataProvider;

  constructor(public toastCtrl:ToastController,public navCtrl: NavController,data: DiceDataProvider) {
    this.data = data;
  }
  
  openProfile(profile){
    this.data.setActualProfile(profile);
    this.navCtrl.parent.select(0);
    //this.navCtrl.push(HomePage);
  }
  
  openCreator(){
    this.navCtrl.push(ProfilecreatorPage);
  }
  
  removeProfile(profile){
   var profiles = this.data.profiles;
   var index = profiles.indexOf(profile);
   profiles.splice(index,1);
   this.data.saveProfiles(profiles);
  }

}
