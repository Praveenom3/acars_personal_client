import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LookupOptionsComponent} from './lookup-options.component';

const routes: Routes = [
  {
    path: '',
    component: LookupOptionsComponent
     //pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LookupOptionsRoutingModule { }
