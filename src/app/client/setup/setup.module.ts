import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BillingContractComponent } from './billing-contract/billing-contract.component';
import { ContractSignorComponent } from './contract-signor/contract-signor.component';
import { PrimaryContractComponent } from './primary-contract/primary-contract.component';
import { SetupRoutingModule } from "app/client/setup/setup.routing";
import { AgreementComponent } from './agreement/agreement.component';
import { DataTableModule } from "angular2-datatable";
import { TextMaskModule } from "angular2-text-mask/dist/angular2TextMask";
import { OrdersService } from "app/_services/_orders.service";
import { SharedModule } from "app/_shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SetupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    TextMaskModule,
    SharedModule
  ],
  declarations: [BillingContractComponent, ContractSignorComponent, PrimaryContractComponent, AgreementComponent],
  providers: [OrdersService]
})
export class SetupModule { }
