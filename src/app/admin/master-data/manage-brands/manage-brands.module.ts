import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBrandsRoutingModule } from './manage-brands-routing.module';

import { MasterDataComponent, AddBrandComponent, EditBrandComponent } from './master-data.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    ManageBrandsRoutingModule,
     ModalModule.forRoot(),
  ],
  declarations: [MasterDataComponent, AddBrandComponent, EditBrandComponent]
})
export class ManageBrandsModule { }
