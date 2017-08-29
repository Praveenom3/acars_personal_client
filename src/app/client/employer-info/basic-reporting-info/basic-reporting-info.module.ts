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
import { PartialViews } from "app/_partial-views/partial-views.module";
import { SharedModule } from "app/_shared/shared.module";
import { TextMaskModule } from "angular2-text-mask/dist/angular2TextMask";
import { ElementMasterService } from "app/_services/_element-master.service";
import { BriBasicInfoService } from "app/_services/_bri-basic-info.service";
import { EmpStatusTrackingService } from "app/_services/_emp-status-tracking.service";
import { PlanOfferingCriteriaService } from "app/_services/_plan-offering-criterial.service";
import { DesignatedGovtEntityService } from "app/_services/_designated-govt-entity.service";
import { AggregatedGroupService } from "app/_services/_aggregated-group.service";
import { AnythingElseService } from "app/_services/_anything-else.service";
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";

@NgModule({
  imports: [
    CommonModule,
    BasicReportingInfoRoutingModule,
    FormsModule,
    SharedModule,
    PartialViews,
    TextMaskModule,
  ],
  declarations: [BasicInfoComponent, EmpStatusTrackingComponent, PlanOfferingCriteriaComponent, DesignatedGovtEntityComponent, AggregatedGroupComponent, AnythingElseComponent],
  providers:[ClientDashBoardService,AnythingElseService,AggregatedGroupService,DesignatedGovtEntityService,ElementMasterService,BriBasicInfoService,EmpStatusTrackingService,PlanOfferingCriteriaService]
})
export class BasicReportingInfoModule { }
