import { Component, OnInit } from '@angular/core';
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-contract-signor',
  templateUrl: './contract-signor.component.html',
  styleUrls: ['./contract-signor.component.css']
})
export class ContractSignorComponent implements OnInit {

  constructor(public route: ActivatedRoute,
    public clientDashBoardService: ClientDashBoardService,
  ) {
    this.clientDashBoardService.productParams = route.snapshot.params['product'];
    this.clientDashBoardService.clientParams = route.snapshot.params['client'];
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
  backToBillingContract() {
    this.clientDashBoardService.contractSignorBackTriggerd = true;
    this.clientDashBoardService.setInformation()
  }
}
