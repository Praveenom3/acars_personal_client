import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanClassesComponent } from "app/client/employer-info/plan-classes/plan-classes/plan-classes.component";
import { ElementMasterResolver } from 'app/_services/_element-resolver';

const routes: Routes = [
    {
        path: '',
        component: PlanClassesComponent,
        resolve: {
            labels: ElementMasterResolver
          }
    },
    {
        path: 'plan-class',        
        loadChildren: 'app/client/employer-info/plan-classes/add-plan-class/add-plan-class.module#AddPlanClassModule'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PlanClassesRoutingModule { }
