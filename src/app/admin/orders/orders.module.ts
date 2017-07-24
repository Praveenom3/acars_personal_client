import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { OrdersRoutingModule } from "./orders.routing";
import { OrdersComponent } from './orders.component';
import { InputMaskModule } from "app/_shared/input-mask.module";
import { PartialViews } from "app/_partial-views/partial-views.module";

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
     TabsModule.forRoot(),
     FormsModule,
     InputMaskModule,
     PartialViews
  ],
  declarations: [OrdersComponent]
})
export class OrdersModule { }
