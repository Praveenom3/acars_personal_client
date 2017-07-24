import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneMaskDirective } from "app/directives/phone-mask.directive";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PhoneMaskDirective],
     exports: [PhoneMaskDirective],
})
export class InputMaskModule { }
