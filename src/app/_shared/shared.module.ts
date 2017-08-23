import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneMaskDirective } from "app/directives/phone-mask.directive";
import { inputFilterDirective } from "app/_directives/input-filter.directive";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PhoneMaskDirective,inputFilterDirective],
     exports: [PhoneMaskDirective,inputFilterDirective],
})
export class SharedModule { }
