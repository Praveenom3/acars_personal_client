import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingContractComponent } from "app/client/setup/billing-contract/billing-contract.component";
import { ContractSignorComponent } from "app/client/setup/contract-signor/contract-signor.component";
import { PrimaryContractComponent } from "app/client/setup/primary-contract/primary-contract.component";
import { AgreementComponent } from "app/client/setup/agreement/agreement.component";

const routes: Routes = [
  {
        path: '',
        redirectTo: 'billing-contract',
        pathMatch: 'full',
  },
  {
        path: 'billing-contract',        
        component: BillingContractComponent
    },
    {
        path: 'contract-signor',        
        component: ContractSignorComponent
    },
    {
        path: 'primary-contract',        
        component: PrimaryContractComponent
    }, 
    {
        path: 'agreement',        
        component: AgreementComponent
    }, 
   

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}
