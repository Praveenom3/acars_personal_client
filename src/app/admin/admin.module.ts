import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { AdminRoutingModule } from './admin.routing';
import { DashboardComponent, FinancialsComponent, NewSalesComponent, ProcessingComponent, ACAFormsComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './dashboard/summary.component';
import { AdminUsersComponent } from "app/admin/dashboard/admin-users.component";
import { JobsComponent } from "app/admin/jobs/jobs.component";

import { ProfileComponent } from "app/admin/profile/profile.component";
import { AddAdminUserComponent } from "app/admin/profile/add-admin-user.component";
import { SearchComponent, SearchResultsComponent } from './search/search.component';
import { ActivityLogComponent } from "app/admin/activity-log/activity-log.component";
import { ErrorLogComponent } from './error-log/error-log.component';

import { PartialViews } from "app/_partial-views/partial-views.module";
import { SharedModule } from "app/_shared/shared.module";
import { ErrorLogService } from "app/_services/_error-log.service";
import { DataTableModule } from "angular2-datatable";
import { AdminUserService } from "app/_services/_admin-user.service";

import { AdminUserFilterPipe } from "app/_filters/admin-users-filter.pipe";
import { ModalModule } from "ngx-bootstrap";
import { TextMaskModule } from "angular2-text-mask/dist/angular2TextMask";
import { inputFilterDirective } from "app/_directives/input-filter.directive";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
    DataTableModule,
    PartialViews,
    TextMaskModule
  ],
  declarations: [
    AdminUserFilterPipe, 
    SummaryComponent, 
    DashboardComponent, 
    FinancialsComponent, 
    NewSalesComponent, 
    AdminUsersComponent, ProcessingComponent, 
    ACAFormsComponent, JobsComponent, ProfileComponent, AddAdminUserComponent,
    SearchComponent, SearchResultsComponent, ActivityLogComponent, 
    ErrorLogComponent
  ],
  providers: [ErrorLogService, AdminUserService]

})
export class AdminModule { }
