import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollComponent } from "app/client/employer-info/payroll/payroll/payroll.component";

const routes: Routes = [
    {
        path: '',
        component: PayrollComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PayrollRoutingModule { }
