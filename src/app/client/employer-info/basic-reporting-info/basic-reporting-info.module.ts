import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicReportingInfoRoutingModule } from './basic-reporting-info-routing.module';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { EmpStatusTrackingComponent } from './emp-status-tracking/emp-status-tracking.component';
import { PlanOfferingCriteriaComponent } from './plan-offering-criteria/plan-offering-criteria.component';
import { DesignatedGovtEntityComponent } from './designated-govt-entity/designated-govt-entity.component';
import { AggregatedGroupComponent } from './aggregated-group/aggregated-group.component';
import { AnythingElseComponent } from './anything-else/anything-else.component';
import { FormsModule } from "@angular/forms";
import { InputMaskModule } from "app/_shared/input-mask.module";
import { PartialViews } from "app/_partial-views/partial-views.module";

@NgModule({
  imports: [
    CommonModule,
    BasicReportingInfoRoutingModule,
    FormsModule,
    InputMaskModule,
    PartialViews
  ],
  declarations: [BasicInfoComponent, EmpStatusTrackingComponent, PlanOfferingCriteriaComponent, DesignatedGovtEntityComponent, AggregatedGroupComponent, AnythingElseComponent]
})
export class BasicReportingInfoModule { }
