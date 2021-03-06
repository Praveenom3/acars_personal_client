import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
declare var $: any;


@Component({
  selector: 'app-companiesdashboard',
  templateUrl: './companiesdashboard.component.html',
  styleUrls: ['./companiesdashboard.component.css']
})
export class CompaniesdashboardComponent implements OnInit {

  public isInvoicePaid: boolean = true;
  public isAgreementSigned: boolean = true;
  public isDiscoveryCallDone: boolean = true;
  public onBoarding: boolean = false;
  public companySelected: boolean;

  product: string;
  constructor(route: ActivatedRoute,
    private dashBoard: ClientDashBoardService
  ) {
    //this.product = route.snapshot.params['product'];
    this.product = 'vht';
    // alert(this.product);    
  }
  ngOnInit() {
    this.dashBoard.changeStyle(true);
    this.dashBoard.clientHomeUrl = '/client/vht';
    this.companySelected = false;
    this.selectCompany();
  }

  selectCompany() {
    this.companySelected = true;
  }

  /**
 * 
 */
  toggleInvoicePayment() {
    this.isInvoicePaid = !this.isInvoicePaid;
    this.checkOnBoarding();
  }
  /**
   * 
   */
  toggleAgreementSign() {
    this.isAgreementSigned = !this.isAgreementSigned;
    this.checkOnBoarding();
  }
  /**
   * 
   */
  toggleDiscoveryCallStatus() {
    this.isDiscoveryCallDone = !this.isDiscoveryCallDone;
    this.checkOnBoarding();
  }


  checkOnBoarding() {

    if (!this.isInvoicePaid && !this.isAgreementSigned && !this.isDiscoveryCallDone) {

      this.onBoarding = true;
    } else {
      this.onBoarding = false;
    }

  }

}
