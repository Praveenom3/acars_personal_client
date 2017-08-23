import { Component, OnInit } from '@angular/core';
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-billing-contract',
  templateUrl: './billing-contract.component.html',
  styleUrls: ['./billing-contract.component.css']
})
export class BillingContractComponent implements OnInit {

  constructor(private router: Router, public activatedRoute: ActivatedRoute,
    public clientDashBoardService: ClientDashBoardService,
  ) {
    this.clientDashBoardService.productParams = activatedRoute.snapshot.params['product'];
    this.clientDashBoardService.clientParams = activatedRoute.snapshot.params['client'];
    this.clientDashBoardService.setInformation()
  }
  ngOnInit() {

  }

  public isSetup = false;
  /* add/remove form div in setup*/
  setup(): void {
    this.isSetup = true;
  }
  close(): void {
    this.isSetup = false;
  }
  setBillingContract() {
    this.clientDashBoardService.clientAsDefaultBilling = true;
    this.clientDashBoardService.isBillingContractSet = true;
    this.clientDashBoardService.setInformation()
  }
}
