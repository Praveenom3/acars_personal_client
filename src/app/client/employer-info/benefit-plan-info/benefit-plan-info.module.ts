import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BenefitPlanInfoRoutingModule } from './benefit-plan-info-routing.module';
import { GeneralPlanInformationComponent } from './general-plan-information/general-plan-information.component';
import { MecCoverageComponent } from './mec-coverage/mec-coverage.component';
import { PartialViews } from "app/_partial-views/partial-views.module";

@NgModule({
  imports: [
    CommonModule,
    BenefitPlanInfoRoutingModule,
    FormsModule,
    PartialViews
  ],
  declarations: [GeneralPlanInformationComponent, MecCoverageComponent]
})
export class BenefitPlanInfoModule { }
