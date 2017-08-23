import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupOptionsRoutingModule } from './lookup-options-routing.module';

import { LookupOptionsComponent } from './lookup-options.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { DataTableModule } from "angular2-datatable";
import { LookupOptionsService } from "app/_services/_lookup-options.service";
import { LookupFilterPipe } from "app/_filters/lookup-filter.pipe";
import { PartialViews } from "app/_partial-views/partial-views.module";
import { SharedModule } from "app/_shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    LookupOptionsRoutingModule,
     ModalModule.forRoot(),
     FormsModule,
     DataTableModule,
     ReactiveFormsModule,
     PartialViews,
     SharedModule
  ],
  declarations: [LookupOptionsComponent,LookupFilterPipe],
  providers:[LookupOptionsService]
})
export class LookupOptionsModule { }
