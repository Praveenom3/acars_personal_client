import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { VhtComponent } from './vht.component';
import { VhtRoutingModule } from './vht.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccordionModule } from "ngx-bootstrap";
import { TrendsComponent } from './trends/trends.component';
import { PayrollComponent } from './payroll/payroll.component';
import { EmployeesComponent } from './employees/employees.component';
import { ActionsComponent } from './actions/actions.component';
import { SetupComponent } from './setup/setup.component';
import { CompaniesdashboardComponent } from './companiesdashboard/companiesdashboard.component';
import { PartialViews } from "app/_partial-views/partial-views.module";
import { ChartsModule } from 'ng2-charts';
import { FileUploadModule }   from 'ng2-file-upload/file-upload/file-upload.module';
import { DataTableModule } from "angular2-datatable";

import { InMeasurementPeriodComponent } from './trends/in-measurement-period/in-measurement-period.component';
import { TrendingEligibleComponent } from './trends/trending-eligible/trending-eligible.component';
import { UsersComponent } from './setup/users/users.component';
import { CompanyDetailsComponent } from './setup/company-details/company-details.component';
import { AboutHourlyTrackingComponent } from './setup/about-hourly-tracking/about-hourly-tracking.component';
import { ImportComponent } from './payroll/import/import.component';
import { UploadsComponent } from './payroll/uploads/uploads.component';
import { EditComponent } from './payroll/edit/edit.component';
import { SubmitComponent } from './payroll/submit/submit.component';
import { EmployeesdetailsComponent } from './employees/employeesdetails/employeesdetails.component';


@NgModule({
  imports: [
    CommonModule,
    VhtRoutingModule,
    FormsModule,
      AccordionModule,
      PartialViews,
      ChartsModule,
      FileUploadModule,
      DataTableModule   
  ],
  declarations: [VhtComponent, DashboardComponent, PayrollComponent,TrendsComponent, EmployeesComponent, ActionsComponent, SetupComponent, CompaniesdashboardComponent,InMeasurementPeriodComponent, TrendingEligibleComponent, UsersComponent, CompanyDetailsComponent, AboutHourlyTrackingComponent, ImportComponent, UploadsComponent, EditComponent, SubmitComponent, EmployeesdetailsComponent]
})
export class VhtModule { }
