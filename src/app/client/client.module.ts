import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { MessagesComponent } from './messages/messages.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { ReportingCheckListComponent } from './reporting-check-list/reporting-check-list.component';
import { VhtComponent } from './vht/vht.component';
import { CompaniesComponent } from "app/client/companies/companies.component";
import { UsersComponent } from "app/client/users/users.component";
import { AccordionModule } from "ngx-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DataTableModule } from "angular2-datatable";
import { HttpModule } from "@angular/http";
import { DataFilterPipe } from "app/client/dashboard/data-filter.pipe";
import { PartialViews } from "app/_partial-views/partial-views.module";
import { SharedModule } from "app/_shared/shared.module";
import { ModalModule } from "ngx-bootstrap";
import { PurchaseService } from "app/_services/_purchase.service";
import { ClientUserService } from "app/_services/_client-user.service";
import { TextMaskModule } from "angular2-text-mask/dist/angular2TextMask";

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    AccordionModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    PartialViews,
    ModalModule.forRoot(),
    TextMaskModule
  ],
  declarations: [
    DashboardComponent,
    DataFilterPipe, ProfileComponent,
    UsersComponent, PurchaseComponent,
    MessagesComponent, ActivityLogComponent,
    CompaniesComponent, ReportingCheckListComponent, VhtComponent
  ],
  providers: [PurchaseService, ClientUserService]
})

export class ClientModule { }
