import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanClassesRoutingModule } from './plan-classes-routing.module';
import { PlanClassesComponent } from './plan-classes/plan-classes.component';
import { PartialViews } from "app/_partial-views/partial-views.module";
import { PlanClassesService } from "app/_services/_plan-classes.service";
import { DataTableModule } from "angular2-datatable";
import { ElementMasterResolver } from 'app/_services/_element-resolver';
import { ElementMasterService } from 'app/_services/_element-master.service';

@NgModule({
  imports: [
    CommonModule,
    PlanClassesRoutingModule,
    DataTableModule,
    FormsModule,
    PartialViews
  ],
  declarations: [PlanClassesComponent],
  providers:[ElementMasterResolver,ElementMasterService,PlanClassesService]
})
export class PlanClassesModule { }
