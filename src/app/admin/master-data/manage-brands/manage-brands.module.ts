import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

import { MasterDataComponent} from './master-data.component';
import { ValidationService } from "app/_services/_validation.service";
import { BrandsService } from "app/_services/_brands.service";
import { DataTableModule } from "angular2-datatable";
import { BrandsFilterPipe } from "app/_filters/brands-filter.pipe";

import { ManageBrandsRoutingModule } from './manage-brands-routing.module';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    ManageBrandsRoutingModule,
     ModalModule.forRoot(),
     DataTableModule,
     TextMaskModule
  ],
  declarations: [BrandsFilterPipe,MasterDataComponent],
  providers: [ BrandsService ],
})
export class ManageBrandsModule { }
