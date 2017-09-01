import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoverageTypeComponent } from "app/client/employer-info/plan-classes/add-plan-class/coverage-type/coverage-type.component";
import { CoverageOfferedComponent } from "app/client/employer-info/plan-classes/add-plan-class/coverage-offered/coverage-offered.component";
import { EmployeeContributionsComponent } from "app/client/employer-info/plan-classes/add-plan-class/employee-contributions/employee-contributions.component";

const routes: Routes = [
    { path: '', component: CoverageTypeComponent },
    { path: 'coverage-offered', component: CoverageOfferedComponent },
    { path: 'employee-contributions', component: EmployeeContributionsComponent },
    
    { path: ':encodedId', component: CoverageTypeComponent },
    { path: ':encodedId/coverage-offered', component: CoverageOfferedComponent },
    { path: ':encodedId/employee-contributions', component: EmployeeContributionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AddPlanClassRoutingModule { }
