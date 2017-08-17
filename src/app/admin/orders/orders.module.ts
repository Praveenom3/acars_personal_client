import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { OrdersRoutingModule } from "./orders.routing";
import { OrdersComponent } from './orders.component';
import { PartialViews } from "app/_partial-views/partial-views.module";
import { SharedModule } from "app/_shared/shared.module";
import { OrdersService } from "app/_services/_orders.service";
import { OrdersFilterPipe } from "app/admin/orders/orders-filter.pipe";
import { DataTableModule } from "angular2-datatable";
import { ModalModule } from "ngx-bootstrap";
import { TextMaskModule } from "angular2-text-mask/dist/angular2TextMask";

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
     ModalModule.forRoot(),
     TabsModule.forRoot(),
     DataTableModule,
     FormsModule,
     ReactiveFormsModule,
     SharedModule,
     TextMaskModule,
     PartialViews
  ],
  declarations: [OrdersComponent, OrdersFilterPipe],  
  providers: [ OrdersService ]
})
export class OrdersModule { }
