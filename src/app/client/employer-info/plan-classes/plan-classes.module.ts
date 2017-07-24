import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanClassesRoutingModule } from './plan-classes-routing.module';
import { PlanClassesComponent } from './plan-classes/plan-classes.component';
import { PartialViews } from "app/_partial-views/partial-views.module";

@NgModule({
  imports: [
    CommonModule,
    PlanClassesRoutingModule,
    FormsModule,
    PartialViews
  ],
  declarations: [PlanClassesComponent]
})
export class PlanClassesModule { }
