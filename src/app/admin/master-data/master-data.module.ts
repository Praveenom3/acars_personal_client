import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ElementMasterComponent } from './element-master/element-master.component';
import { VideosComponent } from './videos/videos.component';
import { FormPricingComponent } from "app/admin/master-data/form-pricing/form-pricing.component";
import { ErrorMasterComponent } from './error-master/error-master.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { ValidationService } from "app/_services/_validation.service";
import { EmailTemplatesService } from "app/_services/_email-templates.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PartialViews } from "app/_partial-views/partial-views.module";
import { DataTableModule } from "angular2-datatable";
import { ElementMasterService } from "app/_services/_element-master.service";
import {SettingsService} from "app/_services/_setting.service";
import { SharedModule } from "app/_shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    MasterDataRoutingModule,
     TabsModule.forRoot(),
      ModalModule.forRoot(),
      ReactiveFormsModule,
      DataTableModule,
      FormsModule,
      PartialViews,
      SharedModule
  ],
  declarations: [AccountSettingsComponent, ElementMasterComponent, VideosComponent, FormPricingComponent, ErrorMasterComponent, EmailTemplatesComponent,],  
  providers: [ ValidationService,EmailTemplatesService, ElementMasterService , SettingsService],
})
export class MasterDataModule {
 }
