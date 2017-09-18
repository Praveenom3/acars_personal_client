import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import {CompaniesComponent} from  './companies/companies.component';
import {VhtComponent} from  './vht.component';
import {CompaniesdashboardComponent} from  './companiesdashboard/companiesdashboard.component';
import {DashboardComponent} from  './dashboard/dashboard.component';

import {TrendsComponent} from  './trends/trends.component';
import {InMeasurementPeriodComponent} from  './trends/in-measurement-period/in-measurement-period.component';
import {TrendingEligibleComponent} from  './trends/trending-eligible/trending-eligible.component';

import {PayrollComponent} from  './payroll/payroll.component';
import {EditComponent} from  './payroll/edit/edit.component';
import {ImportComponent} from  './payroll/import/import.component';
import {SubmitComponent} from  './payroll/submit/submit.component';
import {UploadsComponent} from  './payroll/uploads/uploads.component';



import {EmployeesComponent} from  './employees/employees.component';
import {EmployeesdetailsComponent} from  './employees/employeesdetails/employeesdetails.component';

import {ActionsComponent} from  './actions/actions.component';

import {SetupComponent} from  './setup/setup.component';
import {UsersComponent} from  './setup/users/users.component';
import {CompanyDetailsComponent} from  './setup/company-details/company-details.component';
import {AboutHourlyTrackingComponent} from  './setup/about-hourly-tracking/about-hourly-tracking.component';




const routes: Routes = [

    
  {
        path: '',
        redirectTo: 'companiesdashboard',
        pathMatch: 'full',
  },      
    {
        path: ':company/dashboard',        
        component: DashboardComponent
    }, 
    {
        path: ':company/trends',    
        component: TrendsComponent
    },
     {
        path: ':company/trends/int-measurement',    
        component: InMeasurementPeriodComponent
    },
     {
        path: ':company/trends/trendingeligible',    
        component: TrendingEligibleComponent
    },


     {
        path: ':company/payroll',    
        component: PayrollComponent
    },

    {
        path: ':company/payroll/submit',    
        component: SubmitComponent
    },

    {
        path: ':company/payroll/edit',    
        component: EditComponent
    },

    {
        path: ':company/payroll/uploads',    
        component: UploadsComponent
    },

    {
        path: ':company/payroll/import',    
        component: ImportComponent
    },

     {
        path: ':company/employees',    
        component: EmployeesComponent
    },

     {
        path: ':company/employees/employeedetails',    
        component: EmployeesdetailsComponent
    },

     {
        path: ':company/actions',    
        component: ActionsComponent
    },
     {
        path: ':company/setup',    
        component: SetupComponent
    },

     {
        path: ':company/setup/users',    
        component: UsersComponent
    },

    {
        path: ':company/setup/companydetails',    
        component: CompanyDetailsComponent
    },
     {
        path: ':company/setup/aboutvht',    
        component: AboutHourlyTrackingComponent
    },


     {
        path: 'companiesdashboard',        
        component: CompaniesdashboardComponent
    },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VhtRoutingModule {}
