import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[displayedChart]'
})
export class DisplayedChart {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
