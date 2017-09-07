import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralPlanInformationComponent } from "./general-plan-information/general-plan-information.component";
import { MecCoverageComponent } from "app/client/employer-info/benefit-plan-info/mec-coverage/mec-coverage.component";
import { ElementMasterResolver } from "app/_services/_element-resolver";
import { BpiDataDataResolver } from "app/_services/bpi-data-resolver";

const routes: Routes = [
    {
        path: '',
        component: GeneralPlanInformationComponent,
        resolve: {
            labels: ElementMasterResolver,
            data: BpiDataDataResolver
        }
    },
    {
        path: 'mec-coverage',
        component: MecCoverageComponent,
        resolve: {
            labels: ElementMasterResolver,
            data: BpiDataDataResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class BenefitPlanInfoRoutingModule { }
