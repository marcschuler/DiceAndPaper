import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {DiceDataProvider} from '../dice-data/dice-data';
import {ToastController} from 'ionic-angular';

import {Jsonp} from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class OnlineProvider {

  baseUrl: string = "https://rest.karlthebee.de/diceandpaper/"
  
  isOnline:boolean=false;
  
  //currentSessionId:any;
  
  currentSession:any;
  
  history:any = [];
  
  sessions:any;

  reloader:any;

  constructor(public http: Jsonp, public data: DiceDataProvider,public toastCtrl:ToastController) {
    this.http=http;
  }

  public createSession(name) {
	  name = encodeURI(name);
    var uuid = this.data.getUUID();
    var author = encodeURI(this.data.getName());
    var sess =  this.http.request(this.baseUrl + "session-create?callback=JSONP_CALLBACK&uuid=" + uuid + "&name=" + name + "&author=" + author).map(res => res.json());
    sess.subscribe(response => {
      this.join(response.id);
    },error=>{
    	this.errorMessage("Could not create an session. Are you online?",error);
    });
    return sess;
  }
  
  public send(profile){
    var uuid = this.data.getUUID();
    var name = encodeURI(this.data.getName());
    var gid = this.currentSession.id;
    var json = encodeURI(JSON.stringify(profile));
    var sess =  this.http.request(this.baseUrl + "roll?callback=JSONP_CALLBACK&uuid=" + uuid + "&name=" + name + "&gid=" + gid + "&json=" + json).map(res => res.json());
    sess.subscribe(response => {
      console.log(response);
    },error=>{
    	this.errorMessage("Could not send dice roll. Please try again! Are you online?",error);
    });
  }

	public getSessions(){
  	var uuid = this.data.getUUID();
	 	var sess =  this.http.request(this.baseUrl + "sessions?callback=JSONP_CALLBACK&uuid=" + uuid).map(res=>res.json());
    sess.subscribe(response => {
      this.sessions = response;
    },error=>{
    	this.errorMessage("Could not get any online session. Are you online?",error);
    });
  }
  
  public joinSession(gcode){
	  gcode = encodeURI(gcode);
    var uuid = this.data.getUUID();
    var sess =  this.http.request(this.baseUrl + "session-join?callback=JSONP_CALLBACK&uuid=" + uuid + "&gcode=" + gcode).map(res => res.json());
    sess.subscribe(response => {
      this.join(response.id);
    },error=>{
    	this.errorMessage("Could not join session. Is your gamecode okay? Are you online?",error);
    });
  }
  
  public join(sessionId){
  	this.leave();
    var uuid = this.data.getUUID();
    this.http.request(this.baseUrl + "session?callback=JSONP_CALLBACK&uuid=" + uuid + "&id=" + sessionId).map(res => res.json()).subscribe(response=>{
      this.currentSession = response[0];
      this.getHistory(sessionId);
      this.toastCtrl.create({
      message: 'You are now playing online',
      duration: 3000
    }).present();
    },error=>{
    	this.errorMessage("Could not join session. Are you online?",error);
    });
  }
  
  getHistory(id){
  	var uuid = this.data.getUUID();
  	this.http.request(this.baseUrl + "rolls?callback=JSONP_CALLBACK&uuid=" + uuid + "&gid=" + id).map(res=>res.json()).subscribe(response=>{
  		this.history = response;
  		this.reloader = setInterval(()=>this.reloadHistory(),2000);
  	},error=>{
  		this.errorMessage("Could not load dice history. Are you online?",error);
  	});
  }
  
  reloadHistory(){
	  if (!this.currentSession)return;
	  var uuid  =this.data.getUUID();
	  
	  var since = 0;
	  if (this.history && this.history.length)
		  since = this.history[this.history.length-1].id;
	  this.http.request(this.baseUrl + "rolls?callback=JSONP_CALLBACK&uuid=" + uuid + "&gid=" + this.currentSession.id + "&since=" + since).map(res => res.json()).subscribe(response=>{
		 response.forEach((item,index)=>{
			//add to history
			 this.history.push(item);
			 
			 var profile = item.name;
			 var author = item.author;
			 
			 var txt=author + " rolled on profile '" + profile + "'\n" ;
			 
			 item.dices.forEach((dice,index)=>{
				 txt = txt + dice.result + " (W" + dice.value + ")\n";
			 });
			 //ignore if roll was made by myself
			 if (!item.irolled)
				 this.toastCtrl.create({
					 message: txt,
					 position: 'top',
					 duration: 3000,
					 showCloseButton:true,
					 closeButtonText:'Okay'
				 }).present();
		 });
	  },error=>{
		  this.errorMessage("Could not get live data. Are you online?",error);
	  });
  }
  
  public leave(){
	  if (this.reloader)
		  clearInterval(this.reloader);
	  this.reloader=null;
    this.currentSession=null;
    this.history = null;
     this.toastCtrl.create({
      message: 'You left the session, now playing offline',
      duration: 3000
    }).present();
  }
  
  errorMessage(text,error){
	  console.log("http error : " + error);
	  if (error && error.error){
		  text = error.error;
	  }
	  this.toastCtrl.create({
	      message: "Error : " + text,
	      duration: 2000
	    }).present();
  }
  
  public getCurrentSession(){
    return this.currentSession;
  }

}
