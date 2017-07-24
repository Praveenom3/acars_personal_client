import {Directive, Attribute, ElementRef, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';
import {NgControl, DefaultValueAccessor} from '@angular/forms';

@Directive({
    selector: '[mask-input]',
    host: {
        //'(keyup)': 'onInputChange()',
        '(click)': 'setInitialCaretPosition()'
    }, 
    inputs: ['modify'],
    providers: [DefaultValueAccessor]
})
export class MaskDirective implements OnChanges {
    maskPattern: string;
    placeHolderCounts: any;
    dividers: string[];
    modelValue: string;
    viewValue: string;
    intialCaretPos: any;
    numOfChar: any;
    @Input() modify: any; 

    constructor(public model: NgControl, public ele: ElementRef, @Attribute("mask-input") maskPattern: string) {
        this.dividers = maskPattern.replace(/\*/g, "").split("");
        this.dividers.push("_");
        this.generatePattern(maskPattern);   
        this.numOfChar = 0;
    }
    
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        this.onInputChange(changes);
    }

    onInputChange(changes: { [propertyName: string]: SimpleChange }) {             
        this.modelValue = this.getModelValue();
        var caretPosition = this.ele.nativeElement.selectionStart;
        if (this.viewValue != null) {
          this.numOfChar = this.getNumberOfChar(caretPosition);
        }
        var stringToFormat = this.modelValue;        

        if (stringToFormat.length < 10) {
            stringToFormat = this.padString(stringToFormat);
        }
        
        this.viewValue = this.format(stringToFormat);
        
        if (this.viewValue != null) {
            caretPosition = this.setCaretPosition(this.numOfChar);
        }
        
        this.model.viewToModelUpdate(this.modelValue);
        this.model.valueAccessor.writeValue(this.viewValue);
        this.ele.nativeElement.selectionStart = caretPosition;
        this.ele.nativeElement.selectionEnd = caretPosition;
    }

    generatePattern(patternString) {
        this.placeHolderCounts = (patternString.match(/\*/g) || []).length;
        for (var i = 0; i < this.placeHolderCounts; i++) {
            patternString = patternString.replace('*', "{" + i + "}");
        }
        this.maskPattern = patternString;
    }

    format(s) {
        var formattedString = this.maskPattern;
        for (var i = 0; i < this.placeHolderCounts; i++) {
            formattedString = formattedString.replace("{" + i + "}", s.charAt(i));
        }
        return formattedString;
    }

    padString(s) {
        var pad = "__________";
        return (s + pad).substring(0, pad.length);
    }

    getModelValue() {
        var modelValue = this.model.value;
        if (modelValue == null) {
            return "";
        }
        for (var i = 0; i < this.dividers.length; i++) {
            while (modelValue.indexOf(this.dividers[i]) > -1) {
                modelValue = modelValue.replace(this.dividers[i], "");
            }
        }
        return modelValue;
    }

    setInitialCaretPosition() {
        var caretPosition = this.setCaretPosition(this.modelValue.length);

        this.ele.nativeElement.selectionStart = caretPosition;
        this.ele.nativeElement.selectionEnd = caretPosition;

    }

    setCaretPosition(num) {
        var notDivider = true;
        var caretPos = 1;
        for (; num > 0; caretPos++) {
          var ch = this.viewValue.charAt(caretPos);
          if (!this.isDivider(ch)) {
            num--;
          }
        }
        return caretPos;
    }
    
    isDivider(ch) {
        for (var i = 0; i < this.dividers.length; i++) {
              if (ch == this.dividers[i]) {
                  return true;
              }
        }
    }
    
    getNumberOfChar(pos) {
      var num = 0;
      var containDividers = false;
      for (var i = 0; i < pos; i++) {
        var ch = this.modify.charAt(i);
         
        if (!this.isDivider(ch)) {
          num++;
        }
        else {
          containDividers = true;
        }
      }
      if (containDividers) {
        return num;
      }
      else {
        return this.numOfChar;
      }
    }
    
}