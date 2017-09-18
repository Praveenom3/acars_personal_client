import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[inputFilter],[groupNames],[empInfoValidator],[OnlyNumber],[AlphanFewChar],[AlphaNumernFewChar],[AlphanMoreChar],[OnlyAmountNumber]'
})
export class inputFilterDirective {

  constructor(private el: ElementRef) { }

  @Input() inputFilter: any; /* alphabets,numerical and  ,.&@- */
  @Input() OnlyNumber: any;
  @Input() OnlyAmountNumber: boolean;
  @Input() AlphanFewChar: any;
  @Input() AlphanMoreChar: any;
  @Input() AlphaNumernFewChar: any;
  @Input() DecimalPlaces: string;
  @Input() minValue: string;
  @Input() maxValue: string;
  @Input() empInfoValidator: string;
  @Input() groupNames: string;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    //let valInFloat: number = parseFloat(e.target.value)
    if (this.OnlyAmountNumber) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }

      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) && e.key != "Delete" && e.key != "Tab") {
        e.preventDefault();
      }
    }

    if (this.inputFilter) {
      if (!e.key.match(/^([a-zA-Z0-9 ,.&]+)$/) && e.key != "Backspace" && e.key != "Delete" && e.key != "Tab") {
        e.preventDefault();
      }
    }
    if (this.empInfoValidator) {
      if (!e.key.match(/^([a-zA-Z0-9 '"(),.&-]+)$/) && e.key != "Backspace" && e.key != "Delete" && e.key != "Tab") {
        e.preventDefault();
      }
    }
    else if (this.OnlyNumber) {
      if (!e.key.match(/^([0-9])$/) && e.key != "Tab" && e.key != "Backspace" && e.key != "Delete" && e.key != "Tab") {
        e.preventDefault();
      }
    }
    else if (this.AlphanFewChar) {
      if (!e.key.match(/^([a-zA-Z .-]+)$/) && e.key != "Backspace" && e.key != "Delete" && e.key != "Tab") {
        e.preventDefault();
      }
    }
    else if (this.AlphanMoreChar) {
      if (!e.key.match(/^([a-zA-Z ,.&]+)$/) && e.key != "Backspace" && e.key != "Delete" && e.key != "Tab") {
        e.preventDefault();
      }
    }
    else if (this.AlphaNumernFewChar) {
      if (!e.key.match(/^([a-zA-Z0-9 .-]+)$/) && e.key != "Backspace" && e.key != "Delete" && e.key != "Tab") {
        e.preventDefault();
      }
    }
    else if (this.groupNames) {
      if (!e.key.match(/^([a-zA-Z0-9 '&-]+)$/) && e.key != "Backspace" && e.key != "Delete" && e.key != "Tab") {
        e.preventDefault();
      }
    }
  }



  @HostListener('keypress', ['$event']) onKeyPress(event) {
    let e = <any>event

    if (this.OnlyAmountNumber) {
      let valInFloat: number = parseFloat(e.target.value)

      if (this.minValue.length) {
        // (isNaN(valInFloat) && e.key === "0") - When user enters value for first time valInFloat will be NaN, e.key condition is 
        // because I didn't want user to enter anything below 1.
        // NOTE: You might want to remove it if you want to accept 0
        if (valInFloat < parseFloat(this.minValue)) {
          // console.log("yes");
          //  e.preventDefault();
        }
      }

      if (this.maxValue.length) {
        if (valInFloat > parseFloat(this.maxValue)) {
          e.preventDefault();
        }
      }

      if (this.DecimalPlaces) {
        let currentCursorPos: number = -1;
        if (typeof this.el.nativeElement.selectionStart == "number") {
          currentCursorPos = this.el.nativeElement.selectionStart;
        } else {
          // Probably an old IE browser 
          console.log("This browser doesn't support selectionStart");
        }

        let dotLength: number = e.target.value.replace(/[^\.]/g, '').length
        // If user has not entered a dot(.) e.target.value.split(".")[1] will be undefined
        let decimalLength = e.target.value.split(".")[1] ? e.target.value.split(".")[1].length : 0;

        // (this.DecimalPlaces - 1) because we don't get decimalLength including currently pressed character 
        // currentCursorPos > e.target.value.indexOf(".") because we must allow user's to enter value before dot(.)
        // Checking Backspace etc.. keys because firefox doesn't pressing them while chrome does by default
        if (dotLength > 1 || (dotLength === 1 && e.key === ".") || (decimalLength > (parseInt(this.DecimalPlaces) - 1) &&
          currentCursorPos > e.target.value.indexOf("."))) {
          e.preventDefault();
        }
      }
    }
  }

}

