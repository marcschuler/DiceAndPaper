import {Injectable} from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DiceDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DiceDataProvider {
  
  profiles: any;

  constructor() {
    this.profiles = this.getProfiles();
  }

  /*
   * A list of profiles containing
   * - name
   * - a list of dice numbers
   */
  getProfiles() {
    if (localStorage.getItem("profiles") != null) {
      return JSON.parse(localStorage.getItem("profiles"));
    }
    return JSON.parse('[{"name":"Simple W6","dices":[{"value":6}]},{"name":"W20","dices":[{"value":20}]},{"name":"3x W6","dices":[{"value":6},{"value":6},{"value":6}]}]');
  }

  saveProfiles(profiles: any) {
    localStorage.setItem("profiles", JSON.stringify(profiles));
    this.profiles = profiles;
  }

  setActualProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  getActualProfile() {
    if (localStorage.getItem("profile") != null) {
      console.log(localStorage.getItem("profile"));
      return JSON.parse(localStorage.getItem("profile"));
    }
    return this.getProfiles()[0];
  }

  getUUID() {
    if (localStorage.getItem("uuid") == null)    {      
      localStorage.setItem("uuid", this.generateUUID());
    }
    return localStorage.getItem("uuid"); 
  }
  
  setName(name){
    localStorage.setItem("name",name);
  }
  
  getName(){
    if (localStorage.getItem("name")==null){
    	return "";
      //localStorage.setItem("name","George");
    }
    return localStorage.getItem("name");
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  reset() {
    localStorage.clear();
  }

}
