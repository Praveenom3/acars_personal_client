import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';

import {AdminRoutingModule} from './admin.routing';
import { DashboardComponent, FinancialsComponent, NewSalesComponent, AdminUsersComponent, ProcessingComponent, ACAFormsComponent } from './dashboard/dashboard.component';
import { JobsComponent } from "app/admin/jobs/jobs.component";
import { ProfileComponent } from "app/admin/profile/profile.component";
import { AddAdminUserComponent } from "app/admin/profile/add-admin-user.component";
import { SearchComponent, SearchResultsComponent } from './search/search.component';
import { ActivityLogComponent } from "app/admin/activity-log/activity-log.component";
import { ErrorLogComponent } from './error-log/error-log.component';

import { InputMaskModule } from "app/_shared/input-mask.module";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
	 FormsModule,
     TabsModule.forRoot(),
     TooltipModule.forRoot(),
     PopoverModule.forRoot(),
	      InputMaskModule
  ],
  declarations: [ DashboardComponent, FinancialsComponent, NewSalesComponent, AdminUsersComponent, ProcessingComponent, ACAFormsComponent, JobsComponent, ProfileComponent, AddAdminUserComponent, SearchComponent, SearchResultsComponent, ActivityLogComponent, ErrorLogComponent ],
})
export class AdminModule { }
