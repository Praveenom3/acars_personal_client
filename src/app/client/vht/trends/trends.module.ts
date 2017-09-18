import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from "ngx-bootstrap";
import { TrendsComponent } from './trends.component';
import { TrendsRoutingModule } from './trends.routing';
import { PartialViews } from "app/_partial-views/partial-views.module";
import { DataTableModule } from "angular2-datatable";
// import { InMeasurementPeriodComponent } from './in-measurement-period/in-measurement-period.component';
// import { TrendingEligibleComponent } from './trending-eligible/trending-eligible.component';


@NgModule({
  imports: [
    CommonModule,
    TrendsRoutingModule,
    FormsModule,
      AccordionModule,
      PartialViews,
      DataTableModule
  ],
  declarations: [TrendsComponent],
})
export class TrendsModule { }
