import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlanClassesRoutingModule } from './plan-classes-routing.module';
import { PlanClassesComponent } from './plan-classes/plan-classes.component';

@NgModule({
  imports: [
    CommonModule,
    PlanClassesRoutingModule,
    FormsModule
  ],
  declarations: [PlanClassesComponent]
})
export class PlanClassesModule { }
