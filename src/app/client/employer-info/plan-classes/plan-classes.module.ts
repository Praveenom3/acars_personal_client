import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanClassesRoutingModule } from './plan-classes-routing.module';
import { PlanClassesComponent } from './plan-classes/plan-classes.component';
import { PartialViews } from "app/_partial-views/partial-views.module";
import { PlanClassesService } from "app/_services/_plan-classes.service";
import { DataTableModule } from "angular2-datatable";

@NgModule({
  imports: [
    CommonModule,
    PlanClassesRoutingModule,
    DataTableModule,
    FormsModule,
    PartialViews
  ],
  declarations: [PlanClassesComponent],
  providers:[PlanClassesService]
})
export class PlanClassesModule { }
