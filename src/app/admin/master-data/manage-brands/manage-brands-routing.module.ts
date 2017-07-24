import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterDataComponent, AddBrandComponent, EditBrandComponent } from './master-data.component';

const routes: Routes = [
  {
    path: '',
    component: MasterDataComponent
     //pathMatch: 'full',
  },
  {
    path: 'add-brand',
    component: AddBrandComponent
     //pathMatch: 'full',
  },
  {
    path: 'edit-brand',
    component: EditBrandComponent
     //pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ManageBrandsRoutingModule { }
