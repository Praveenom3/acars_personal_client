import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddPlanClassRoutingModule } from './add-plan-class-routing.module';
import { CoverageTypeComponent } from './coverage-type/coverage-type.component';
import { CoverageOfferedComponent } from './coverage-offered/coverage-offered.component';
import { EmployeeContributionsComponent } from './employee-contributions/employee-contributions.component';
import { PartialViews } from "app/_partial-views/partial-views.module";
import { PlanClassesService } from "app/_services/_plan-classes.service";
import { ElementMasterService } from "app/_services/_element-master.service";

@NgModule({
  imports: [
    CommonModule,
    AddPlanClassRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PartialViews
  ],
  declarations: [CoverageTypeComponent, CoverageOfferedComponent, EmployeeContributionsComponent],
  providers: [PlanClassesService, ElementMasterService]
})
export class AddPlanClassModule { }
