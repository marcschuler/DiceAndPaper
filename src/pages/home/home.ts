import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

//import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import {DeviceMotion} from '@ionic-native/device-motion';
import {Vibration} from '@ionic-native/vibration';

import {HistoryPage} from'../history/history';
import {WelcomePage} from'../welcome/welcome';

import {DiceDataProvider} from '../../providers/dice-data/dice-data';
import {OnlineProvider} from '../../providers/online/online';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'  
})
export class HomePage {
  
  profile: any;
  
  history: any = [];

	motionX=0;
	motionY=0;
	motionZ=0;
	
	motionD=0;
	
	motionSub;
	
	lastRoll = 0;

  constructor(public platform:Platform, public navCtrl: NavController,public data:DiceDataProvider,public online:OnlineProvider,public motion:DeviceMotion,public vibration:Vibration) {
    this.profile = data.getActualProfile();
    
    if (platform.is('cordova'))
    platform.ready().then(()=>{
    	this.subMotion(true);
    	this.platform.pause.subscribe(()=>{
    		this.subMotion(false);
    	});
    	this.platform.resume.subscribe(()=>{
    		this.subMotion(true);
    	});
    });
  }
  
  	subMotion(active){
  		if (this.motionSub){
  			this.motionSub.unsubscribe();
  			this.motionSub=null;
  		}
  		if (active){
  			this.motionSub = this.motion.watchAcceleration({frequency:500}).subscribe(acc=>{
  	    		this.checkMotion(acc);
  	    	});
  		}
  	}
    
    checkMotion(acc){
    	//first measurement
    	var deltaX = Math.abs(acc.x - this.motionX);
    	var deltaY = Math.abs(acc.y - this.motionY);
    	var deltaZ = Math.abs(acc.z - this.motionZ);
    	
    	this.motionD = Math.sqrt(deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ);
 
    	this.motionX = acc.x;
    	this.motionY = acc.y;
    	this.motionZ = acc.z;
    	
    	if (this.motionD >= 7)
    		this.roll(true);
    }
   
  ionViewDidEnter(){
    this.refresh();    
  }
  
  refresh(){    
    this.profile = this.data.getActualProfile();
    this.roll(false);
  }
  
  openHistory(){
    this.navCtrl.push(HistoryPage,{
    history: this.history
    });
  }  
  
  roll(fill){
	  
	if (new Date().getTime() - this.lastRoll < 1000)
		return;
	
	this.lastRoll = new Date().getTime();
	  
    for(var i=0;i<this.profile.dices.length;i++){
      var x = " - ";
      if (fill){
    	  for(var n=0;n<100;n++){
    		  Math.random();
    	  }
        x = ""+Math.ceil(Math.random()*this.profile.dices[i].value);
      }
      this.profile.dices[i].result = x;
    }

    if (fill){
     this.profile.date = new Date().toLocaleString();
      this.history.push(JSON.parse(JSON.stringify(this.profile)));
      this.vibration.vibrate(150);
      //online...
      if (this.online.currentSession){
        this.online.send(this.profile);
      }
    }   
  }
}
