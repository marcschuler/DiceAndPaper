import { Component,Input } from '@angular/core';

/**
 * Generated class for the ErrorPageComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'error-page',
  templateUrl: 'error-page.html'
})
export class ErrorPageComponent {

	@Input() title:string ="An error occured";
  @Input() text: string = "Error at displaying error message";

  constructor() {
  }

}
