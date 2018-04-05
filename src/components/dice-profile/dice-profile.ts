import { Component,Input } from '@angular/core';

/**
 * Generated class for the DiceProfileComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'dice-profile',
  templateUrl: 'dice-profile.html'
})
export class DiceProfileComponent {

  @Input() profile:any;
  @Input() size:any=100;

  constructor() {
  }
  
  ionOnInit(){
    console.log("diceprofile:="+JSON.stringify(this.profile));
  }

}
