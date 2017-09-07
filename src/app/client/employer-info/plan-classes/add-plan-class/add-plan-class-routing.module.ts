import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoverageTypeComponent } from "app/client/employer-info/plan-classes/add-plan-class/coverage-type/coverage-type.component";
import { CoverageOfferedComponent } from "app/client/employer-info/plan-classes/add-plan-class/coverage-offered/coverage-offered.component";
import { EmployeeContributionsComponent } from "app/client/employer-info/plan-classes/add-plan-class/employee-contributions/employee-contributions.component";
import { ElementMasterResolver } from "app/_services/_element-resolver";
import { PlanClassDataDataResolver } from "app/_services/plan-class-data-resolver";

const routes: Routes = [
  {
    path: '',
    component: CoverageTypeComponent,
    resolve: {
      labels: ElementMasterResolver,
      data: PlanClassDataDataResolver
    }
  },
  {
    path: 'coverage-offered',
    component: CoverageOfferedComponent,
    resolve: {
      labels: ElementMasterResolver,
      data: PlanClassDataDataResolver
    }
  },
  {
    path: 'employee-contributions',
    component: EmployeeContributionsComponent,
    resolve: {
      labels: ElementMasterResolver,
      data: PlanClassDataDataResolver
    }
  },

  {
    path: ':encodedId',
    component: CoverageTypeComponent,
    resolve: {
      labels: ElementMasterResolver,
      data: PlanClassDataDataResolver
    }
  },
  {
    path: ':encodedId/coverage-offered',
    component: CoverageOfferedComponent,
    resolve: {
      labels: ElementMasterResolver,
      data: PlanClassDataDataResolver
    }
  },
  {
    path: ':encodedId/employee-contributions',
    component: EmployeeContributionsComponent,
    resolve: {
      labels: ElementMasterResolver,
      data: PlanClassDataDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AddPlanClassRoutingModule { }
