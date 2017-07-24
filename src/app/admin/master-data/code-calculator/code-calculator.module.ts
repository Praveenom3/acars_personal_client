import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeCalculatorRoutingModule } from './code-calculator-routing.module';
import { CodeCalculatorComponent, AddCodeCalculatorComponent, EditCodeCalculatorComponent } from './code-calculator/code-calculator.component';
//import { AddCodeCalculatorComponent } from './code-calculator/add-code-calculator.component';
//import { EditCodeCalculatorComponent } from './code-calculator/edit-code-calculator.component';

@NgModule({
  imports: [
    CommonModule,
    CodeCalculatorRoutingModule
  ],
  declarations: [CodeCalculatorComponent, AddCodeCalculatorComponent, EditCodeCalculatorComponent]
})
export class CodeCalculatorModule { }
