import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { ElementMasterComponent } from "./element-master/element-master.component";
import { VideosComponent } from "app/admin/master-data/videos/videos.component";
import { FormPricingComponent } from "app/admin/master-data/form-pricing/form-pricing.component";
import {ErrorMasterComponent } from './error-master/error-master.component';
import {EmailTemplatesComponent} from './email-templates/email-templates.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'manage-brands',
        pathMatch: 'full',
    },
    {
        path: '',        
        children: [
            {
                path: 'manage-brands',
                loadChildren: 'app/admin/master-data/manage-brands/manage-brands.module#ManageBrandsModule'
            }
        ],
    },
    {
        path: '',        
        children: [
            {
                path: 'lookup-options',
                loadChildren: 'app/admin/master-data/lookup-options/lookup-options.module#LookupOptionsModule'
            }
        ],
    },
   {
        path: '',        
        children: [
            {
                path: 'account-settings',
                component: AccountSettingsComponent
            }
        ],
    },
   {
        path: '',        
        children: [
            {
                path: 'element-master',
                component: ElementMasterComponent
            }
        ],
    },
   {
        path: '',        
        children: [
            {
                path: 'form-pricing',
                component: FormPricingComponent
            }
        ],
    },
    {
        path: '',        
        children: [
            {
                path: 'code-calculator',
                loadChildren: 'app/admin/master-data/code-calculator/code-calculator.module#CodeCalculatorModule'
            }
        ],
    },
   {
        path: '',        
        children: [
            {
                path: 'videos',
                component: VideosComponent
            }
        ],
    },
    {
        path: '',        
        children: [
            {
                path: 'products',
                loadChildren: 'app/admin/master-data/products/products.module#ProductsModule'
            }
        ],
    },
    {
        path: 'error-master',     
        component: ErrorMasterComponent   
    },
     {
        path: 'email-templates',     
        component: EmailTemplatesComponent   
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MasterDataRoutingModule { }
