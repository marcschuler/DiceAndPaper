import { NgModule } from '@angular/core';
import { DiceComponent } from './dice/dice';
import { DiceProfileComponent } from './dice-profile/dice-profile';
import { ErrorPageComponent } from './error-page/error-page';
@NgModule({
	declarations: [DiceComponent,
    DiceProfileComponent,
    ErrorPageComponent],
	imports: [],
	exports: [DiceComponent,
    DiceProfileComponent,
    ErrorPageComponent]
})
export class ComponentsModule {}
