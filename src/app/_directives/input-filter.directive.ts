import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[inputFilter],[OnlyNumber],[AlphanFewChar],[AlphaNumernFewChar],[AlphanMoreChar]'
})
export class inputFilterDirective {

  constructor(private el: ElementRef) { }

  @Input() inputFilter: any; /* alphabets,numerical and  ,.&@- */
  @Input() OnlyNumber: any;
  @Input() AlphanFewChar: any;
  @Input() AlphanMoreChar: any;
  @Input() AlphaNumernFewChar: any;

  @HostListener('keydown', ['$event']) onKeyDown(event) {

    let e = <KeyboardEvent>event;
    if (this.inputFilter) {
      if (!e.key.match(/^([a-zA-Z0-9 ,.&@-]+)$/) && e.key != "Backspace") {
        e.preventDefault();
      }
    }
    else if (this.OnlyNumber) {
      if (!e.key.match(/^([0-9])/) && e.key != "Backspace") {
        e.preventDefault();
      }
    }
    else if (this.AlphanFewChar) {
      if (!e.key.match(/^([a-zA-Z .-]+)$/) && e.key != "Backspace") {
        e.preventDefault();
      }
    }
    else if (this.AlphanMoreChar) {
      if (!e.key.match(/^([a-zA-Z ,.&@-]+)$/) && e.key != "Backspace") {
        e.preventDefault();
      }
    }
    else if (this.AlphaNumernFewChar) {
      if (!e.key.match(/^([a-zA-Z0-9 .-]+)$/) && e.key != "Backspace") {
        e.preventDefault();
      }
    }
  }
}

