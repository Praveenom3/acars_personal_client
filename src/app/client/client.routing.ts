import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { MessagesComponent } from './messages/messages.component';
import { ActivityLogComponent } from "app/client/activity-log/activity-log.component";
import { BillingContractComponent } from "app/client/setup/billing-contract/billing-contract.component";
import { ReportingCheckListComponent } from "app/client/reporting-check-list/reporting-check-list.component";
import { VhtComponent } from "app/client/vht/vht.component";
import { CompaniesComponent } from "app/client/companies/companies.component";
import { UsersComponent } from "app/client/users/users.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'setup',
        pathMatch: 'full',
    },
     {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
             {
                path: 'profile',
                component: ProfileComponent
            }, 
            {
                path: 'purchases',
                component: PurchaseComponent
            },
            {
                path: 'messages',
                component: MessagesComponent
            },
            {
                path: 'activity-log',
                component: ActivityLogComponent
            },
            {
                path: ':product/companies',
                component: CompaniesComponent
            },
            {
                path: ':product/:company/reporting-check-list',
                component: ReportingCheckListComponent
            },
            {
                path: 'messages',
                component: MessagesComponent
            },
             {
                path: 'vht',
                component: VhtComponent
            },
            {
                path: ':product/:company/users',
                component: UsersComponent
            },
            {
                path: '',        
                children: [
                    {
                        path: ':product/:company/employer-info',
                        loadChildren: 'app/client/employer-info/employer-info.module#EmployerInfoModule'
                    }
                ],
            },
            {
                path: '',        
                children: [
                    {
                        path: 'setup',
                        loadChildren: 'app/client/setup/setup.module#SetupModule'
                    }
                ],
            },
            {
                path: '',        
                children: [
                    {
                        path: 'search',
                        loadChildren: 'app/client/search/search.module#SearchModule'
                    }
                ],
            },
        ],
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }
