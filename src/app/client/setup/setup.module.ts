import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BillingContractComponent } from './billing-contract/billing-contract.component';
import { ContractSignorComponent } from './contract-signor/contract-signor.component';
import { PrimaryContractComponent } from './primary-contract/primary-contract.component';
import { SetupRoutingModule } from "app/client/setup/setup.routing";
import { AgreementComponent } from './agreement/agreement.component';

@NgModule({
  imports: [
    CommonModule,
    SetupRoutingModule,
    FormsModule
  ],
  declarations: [BillingContractComponent, ContractSignorComponent, PrimaryContractComponent, AgreementComponent]
})
export class SetupModule { }
