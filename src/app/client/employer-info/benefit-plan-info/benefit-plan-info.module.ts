import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BenefitPlanInfoRoutingModule } from './benefit-plan-info-routing.module';
import { GeneralPlanInformationComponent } from './general-plan-information/general-plan-information.component';
import { MecCoverageComponent } from './mec-coverage/mec-coverage.component';
import { PartialViews } from "app/_partial-views/partial-views.module";
import { ElementMasterService } from "app/_services/_element-master.service";
import { GeneralPlanInfoService } from "app/_services/_general-plan-info.service";
import { MecCoverageService } from "app/_services/_mec-coverage.service";
import { SharedModule } from "app/_shared/shared.module";
import { BpiDataDataResolver } from "app/_services/bpi-data-resolver";
import { ElementMasterResolver } from "app/_services/_element-resolver";

@NgModule({
  imports: [
    CommonModule,
    BenefitPlanInfoRoutingModule,
    FormsModule,
    PartialViews,
    SharedModule
  ],
  declarations: [GeneralPlanInformationComponent, MecCoverageComponent],
  providers: [BpiDataDataResolver, ElementMasterResolver, ElementMasterService, GeneralPlanInfoService, MecCoverageService]
})
export class BenefitPlanInfoModule { }
