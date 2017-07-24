import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicInfoComponent } from "app/client/employer-info/basic-reporting-info/basic-info/basic-info.component";
import { EmpStatusTrackingComponent } from "app/client/employer-info/basic-reporting-info/emp-status-tracking/emp-status-tracking.component";
import { PlanOfferingCriteriaComponent } from "app/client/employer-info/basic-reporting-info/plan-offering-criteria/plan-offering-criteria.component";
import { DesignatedGovtEntityComponent } from "app/client/employer-info/basic-reporting-info/designated-govt-entity/designated-govt-entity.component";
import { AggregatedGroupComponent } from "app/client/employer-info/basic-reporting-info/aggregated-group/aggregated-group.component";
import { AnythingElseComponent } from "app/client/employer-info/basic-reporting-info/anything-else/anything-else.component";

const routes: Routes = [
    {
        path: '',
        component: BasicInfoComponent
    },
    {
        path: 'emp-status-tracking',
        component: EmpStatusTrackingComponent
    },
    {
        path: 'plan-offering-criteria',
        component: PlanOfferingCriteriaComponent
    },
    {
        path: 'designated-govt-entity',
        component: DesignatedGovtEntityComponent
    },
    {
        path: 'aggregated-group',
        component: AggregatedGroupComponent
    },
    {
        path: 'anything-else',
        component: AnythingElseComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BasicReportingInfoRoutingModule { }
