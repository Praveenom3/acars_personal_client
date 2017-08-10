import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupOptionsRoutingModule } from './lookup-options-routing.module';

import { LookupOptionsComponent } from './lookup-options.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { DataTableModule } from "angular2-datatable";
import { LookupOptionsService } from "app/_services/_lookup-options.service";
import { LookupFilterPipe } from "app/_filters/lookup-filter.pipe";

@NgModule({
  imports: [
    CommonModule,
    LookupOptionsRoutingModule,
     ModalModule.forRoot(),
     FormsModule,
     DataTableModule,
     ReactiveFormsModule
  ],
  declarations: [LookupOptionsComponent,LookupFilterPipe],
  providers:[LookupOptionsService]
})
export class LookupOptionsModule { }
