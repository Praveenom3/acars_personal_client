import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MasterDataComponent} from './master-data.component';

const routes: Routes = [
  {
    path: '',
    component: MasterDataComponent    
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [FormsModule,ReactiveFormsModule,RouterModule],
  providers: []
})
export class ManageBrandsRoutingModule { }
