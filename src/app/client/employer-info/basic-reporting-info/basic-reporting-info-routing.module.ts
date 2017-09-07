import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicInfoComponent } from "app/client/employer-info/basic-reporting-info/basic-info/basic-info.component";
import { EmpStatusTrackingComponent } from "app/client/employer-info/basic-reporting-info/emp-status-tracking/emp-status-tracking.component";
import { PlanOfferingCriteriaComponent } from "app/client/employer-info/basic-reporting-info/plan-offering-criteria/plan-offering-criteria.component";
import { DesignatedGovtEntityComponent } from "app/client/employer-info/basic-reporting-info/designated-govt-entity/designated-govt-entity.component";
import { AggregatedGroupComponent } from "app/client/employer-info/basic-reporting-info/aggregated-group/aggregated-group.component";
import { AnythingElseComponent } from "app/client/employer-info/basic-reporting-info/anything-else/anything-else.component";
import { ElementMasterResolver } from "app/_services/_element-resolver";
import { EmployerInfoDataResolver } from "app/_services/_employer-info-data-resolver";

const routes: Routes = [
    {
        path: '',
        component: BasicInfoComponent,
        resolve: {
            labels: ElementMasterResolver,
            data: EmployerInfoDataResolver
        }
    },
    {
        path: 'emp-status-tracking',
        component: EmpStatusTrackingComponent,
        resolve: {
            labels: ElementMasterResolver,
            data: EmployerInfoDataResolver
        }
    },
    {
        path: 'plan-offering-criteria',
        component: PlanOfferingCriteriaComponent,
        resolve: {
            labels: ElementMasterResolver,
            data: EmployerInfoDataResolver
        }
    },
    {
        path: 'designated-govt-entity',
        component: DesignatedGovtEntityComponent,
        resolve: {
            labels: ElementMasterResolver,
            data: EmployerInfoDataResolver
        }
    },
    {
        path: 'aggregated-group',
        component: AggregatedGroupComponent,
        resolve: {
            labels: ElementMasterResolver,
            data: EmployerInfoDataResolver
        }
    },
    {
        path: 'anything-else',
        component: AnythingElseComponent,
        resolve: {
            labels: ElementMasterResolver,
            data: EmployerInfoDataResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class BasicReportingInfoRoutingModule { }
