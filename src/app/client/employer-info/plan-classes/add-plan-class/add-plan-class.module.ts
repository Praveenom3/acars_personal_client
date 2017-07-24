import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddPlanClassRoutingModule } from './add-plan-class-routing.module';
import { CoverageTypeComponent } from './coverage-type/coverage-type.component';
import { CoverageOfferedComponent } from './coverage-offered/coverage-offered.component';
import { EmployeeContributionsComponent } from './employee-contributions/employee-contributions.component';

@NgModule({
  imports: [
    CommonModule,
    AddPlanClassRoutingModule,
    FormsModule
  ],
  declarations: [CoverageTypeComponent, CoverageOfferedComponent, EmployeeContributionsComponent]
})
export class AddPlanClassModule { }
