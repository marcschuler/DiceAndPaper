import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {DiceDataProvider} from '../../providers/dice-data/dice-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  name:string;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public data:DiceDataProvider) {
    this.name = data.getName();
  }
  
  ionViewDidEnter(){
	  this.name = this.data.getName();
  }
  
  resetApp(){
    let confirm = this.alertCtrl.create({
      title: 'Do you really want to reset this app?',
      message: 'All profiles and online content will be permanently deleted!',
      buttons:[
        {
          text:'I don\'t want the data to go',
          handler:() =>{
           
          }
        },
        {
          text:'Delete everything',
          handler: ()=>{
             this.data.reset();
             window.location.reload(true);
          }
        }
      ]
    });
    confirm.present(); 
  }
  
  saveName(){
    this.data.setName(this.name);
  }
 

}
