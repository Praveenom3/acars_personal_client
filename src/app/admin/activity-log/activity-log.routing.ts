import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ActivityLogComponent} from './activity-log.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityLogComponent
     //pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ActivityLogRoutingModule { }
