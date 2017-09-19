import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SearchBandComponent } from './search-band/search-band.component';
import { AdminDashboardNavComponent } from './admin-dashboard-nav/admin-dashboard-nav.component';
import { ClientCompanyInfoComponent } from './client-company-info/client-company-info.component';
import { ClientReportingBandComponent } from './client-reporting-band/client-reporting-band.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { ModalModule } from "ngx-bootstrap";
import { DeleteConfirmationComponent } from "app/_partial-views/delete-confirmation/delete-confirmation.component";
import { CloseModalConfirmationComponent } from "app/_partial-views/close-modal-confirmation/close-modal-confirmation.component";
import { FormsModule } from '@angular/forms';
import { GlobalService } from "app/_services/_global.service";
import { VhtBandComponent } from './vht-band/vht-band.component';
import { VhtActionsComponent } from './vht-actions/vht-actions.component';
import { AdminMasterDataNavComponent } from 'app/_partial-views/admin-masterData-nav/admin-masterData-nav.component';

@NgModule({
   imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [CloseModalConfirmationComponent, DeleteConfirmationComponent,BreadcrumbsComponent, SearchBandComponent, AdminDashboardNavComponent, ClientCompanyInfoComponent, ClientReportingBandComponent, ControlMessagesComponent,VhtBandComponent, VhtActionsComponent, AdminMasterDataNavComponent],
  providers:[GlobalService],
  exports: [CloseModalConfirmationComponent, DeleteConfirmationComponent,BreadcrumbsComponent, SearchBandComponent, AdminDashboardNavComponent, ClientCompanyInfoComponent, ClientReportingBandComponent, ControlMessagesComponent,VhtBandComponent, VhtActionsComponent, AdminMasterDataNavComponent]
})
export class PartialViews { }
