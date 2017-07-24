import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeCalculatorComponent, AddCodeCalculatorComponent, EditCodeCalculatorComponent } from "./code-calculator/code-calculator.component";
//import { AddCodeCalculatorComponent } from "./code-calculator/add-code-calculator.component";
//import { EditCodeCalculatorComponent } from "./code-calculator/edit-code-calculator.component";

const routes: Routes = [
  {
    path: '',
    component: CodeCalculatorComponent
     //pathMatch: 'full',
  },
  {
    path: 'add-code-calculator',
    component: AddCodeCalculatorComponent
     //pathMatch: 'full',
  },
  {
    path: 'edit-code-calculator',
    component: EditCodeCalculatorComponent
     //pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CodeCalculatorRoutingModule { }
