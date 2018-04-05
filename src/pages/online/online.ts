import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {OnlineProvider} from '../../providers/online/online';

import {HistoryPage} from'../history/history';

/**
 * Generated class for the OnlinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-online',
  templateUrl: 'online.html',
})
export class OnlinePage {
  
  gamecode:string="";
  name:string="";
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public online: OnlineProvider) {
  }

  ionViewDidEnter() {
    this.reload();
  }
  
  refresh(refresher){
  	this.reload();
  	refresher.complete();
  }
  
  reload(){
  	this.online.getSessions();
  }
  
  createSession(){
    this.online.createSession(this.name);
    this.reload();
  }
  
  joinSession(){
    this.online.joinSession(this.gamecode);
    this.reload();
  }
  
   openHistory(){
    this.navCtrl.push(HistoryPage,{
    history: this.online.history,
    online: true
    });
  }  
  
  join(id){
    this.online.join(id);
  }

}
