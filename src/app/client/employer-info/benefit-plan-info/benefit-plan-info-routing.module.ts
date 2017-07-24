import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralPlanInformationComponent } from "./general-plan-information/general-plan-information.component";
import { MecCoverageComponent } from "app/client/employer-info/benefit-plan-info/mec-coverage/mec-coverage.component";

const routes: Routes = [
    {
        path: '',
        component: GeneralPlanInformationComponent
    },
    {
        path: 'mec-coverage',
        component: MecCoverageComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BenefitPlanInfoRoutingModule { }
