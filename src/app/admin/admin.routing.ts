import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AppheaderComponent } from './layouts/appheader/appheader.component';
import { ManageEFilesComponent } from './manage-e-files/manage-e-files.component';
import { DashboardComponent, FinancialsComponent, NewSalesComponent, ProcessingComponent, ACAFormsComponent, SummaryComponent } from './dashboard/dashboard.component';
import { AdminUsersComponent } from "app/admin/dashboard/admin-users.component";
import { JobsComponent } from "app/admin/jobs/jobs.component";
import { ProfileComponent } from "app/admin/profile/profile.component";
import { AddAdminUserComponent } from "app/admin/profile/add-admin-user.component";
import { SearchComponent, SearchResultsComponent } from "app/admin/search/search.component";
import { ActivityLogComponent } from "app/admin/activity-log/activity-log.component";
import { ErrorLogComponent } from "app/admin/error-log/error-log.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'summary',
        pathMatch: 'full',
    },
    {
        path: 'summary',        
        component: SummaryComponent
    },
    {
        path: 'dashboard',        
        component: DashboardComponent
    },
    {
        path: 'financials',        
        component: FinancialsComponent
    },
    {
        path: 'new-sales',        
        component: NewSalesComponent
    }, 
    {
        path: 'admin-users',        
        component: AdminUsersComponent
    },
    {
        path: 'processing',        
        component: ProcessingComponent
    },
    {
        path: 'aca-forms',        
        component: ACAFormsComponent
    },
    {
        path: 'search',        
        component: SearchComponent
    },
    {
        path: 'search/search-results',        
        component: SearchResultsComponent
    },
    {
        path: 'manage-e-files',
        loadChildren: 'app/admin/manage-e-files/manage-e-files.module#ManageEFilesModule'
    },
    {
        path: 'master-data',
        loadChildren: 'app/admin/master-data/master-data.module#MasterDataModule'
    },
    {
        path: 'orders',
        loadChildren: 'app/admin/orders/orders.module#OrdersModule'
    },
    {
        path: 'jobs',        
        component: JobsComponent
    },
    {
        path: 'profile',        
        component: ProfileComponent
    },
    {
        path: 'activity-log',        
        component: ActivityLogComponent
    },
    {
        path: 'error-log',        
        component: ErrorLogComponent
    },
    {
        path: 'profile/add-admin-user',        
        component: AddAdminUserComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
