import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeCalculatorRoutingModule } from './code-calculator-routing.module';
import { CodeCalculatorComponent} from './code-calculator.component';
import { ModalModule } from "ngx-bootstrap";
import { DataTableModule } from "angular2-datatable";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CodeCalculatorService } from "app/_services/_code-calculator.service";
import { LookupOptionsService } from "app/_services/_lookup-options.service";
import { CodeFilterPipe } from "app/_filters/code-filter.pipe";
import { PartialViews } from 'app/_partial-views/partial-views.module';

@NgModule({
  imports: [
    CommonModule,
    CodeCalculatorRoutingModule,
     ModalModule.forRoot(),
     FormsModule,
     DataTableModule,
     ReactiveFormsModule,
     PartialViews,
  ],
  declarations: [CodeCalculatorComponent,CodeFilterPipe],
  providers:[CodeCalculatorService,LookupOptionsService]
})
export class CodeCalculatorModule { }
