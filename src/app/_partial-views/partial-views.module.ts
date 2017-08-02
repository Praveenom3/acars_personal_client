import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SearchBandComponent } from './search-band/search-band.component';
import { AdminDashboardNavComponent } from './admin-dashboard-nav/admin-dashboard-nav.component';
import { ClientCompanyInfoComponent } from './client-company-info/client-company-info.component';
import { ClientReportingBandComponent } from './client-reporting-band/client-reporting-band.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';

@NgModule({
   imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BreadcrumbsComponent, SearchBandComponent, AdminDashboardNavComponent, ClientCompanyInfoComponent, ClientReportingBandComponent, ControlMessagesComponent],
  exports: [BreadcrumbsComponent, SearchBandComponent, AdminDashboardNavComponent, ClientCompanyInfoComponent, ClientReportingBandComponent, ControlMessagesComponent]
})
export class PartialViews { }