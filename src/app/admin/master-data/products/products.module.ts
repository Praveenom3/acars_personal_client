import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

import {ProductsRoutingModule} from './products.routing';
import {ProductsComponent} from './products.component';
import { DataTableModule } from "angular2-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductsService } from "app/_services/_products.service";
import { ProductsFilterPipe } from "app/_filters/products-filter.pipe";

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
     ModalModule.forRoot(),
     FormsModule,
     DataTableModule,
     ReactiveFormsModule
  ],
  declarations: [ProductsComponent,ProductsFilterPipe],
  providers: [ ProductsService ]
})
export class ProductsModule { }
