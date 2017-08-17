import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeCalculatorComponent} from "./code-calculator.component";

const routes: Routes = [
  {
    path: '',
    component: CodeCalculatorComponent
     //pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CodeCalculatorRoutingModule { }
