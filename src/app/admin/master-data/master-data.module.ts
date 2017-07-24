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

@NgModule({
  imports: [
    CommonModule,
    MasterDataRoutingModule,
     TabsModule.forRoot(),
      ModalModule.forRoot(),
  ],
  declarations: [AccountSettingsComponent, ElementMasterComponent, VideosComponent, FormPricingComponent, ErrorMasterComponent, EmailTemplatesComponent]
})
export class MasterDataModule {
 }
