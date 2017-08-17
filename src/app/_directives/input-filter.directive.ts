import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[inputFilter],[OnlyNumber]'
})
export class inputFilterDirective {

  constructor(private el: ElementRef) { }

  @Input() inputFilter: any;
  @Input() OnlyNumber: any;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    if (this.inputFilter) {
      if (!e.key.match(/^([a-zA-Z0-9 @-]+)$/)) {
        e.preventDefault();
      }
    }
    else if (this.OnlyNumber) {
      if (!e.key.match(/^([0-9]+)$/)) {
        e.preventDefault();
      }
    }

  }
}

