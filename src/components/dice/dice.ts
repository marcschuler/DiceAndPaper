import { Component,Input } from '@angular/core';

/**
 * Generated class for the DiceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'dice',
  templateUrl: 'dice.html'
})
export class DiceComponent {

  @Input() value: any = 20;
  @Input() result: any="-";
  @Input() size : any=100;
  sizeFont:any=40;

  constructor() {
  }
  
  ionOnInit(){
    this.sizeFont = this.size*0.4;
    if (this.result=="" || this.result<1 || this.result>this.value)
      this.result="-"
  }

}
