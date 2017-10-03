import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { OutstandingsService } from "app/_services/_outstandings.service";
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
  _errorMessage;

  clientsCount: number = 0;
  adminUsersCount: number = 0;
  companiesCount: number = 0;
  formsPurchased: number = 0;
  invoicedAmount;
  recievedAmount;
  countOfSignedContracts: number = 0;
  purchasesCount: number = 0;
  brokersCount: number = 0;
  selfInsuredPlans: number = 0;

  constructor(private _outstandingService: OutstandingsService) {
  }
  /**
   * 
   */
  ngOnInit() {
    this.getSummaryData();
  }
  /**
   * Retuns the summary count of clients, purchases,admin users,companies ....
   */
  getSummaryData() {
    this._outstandingService.getSummaryInformation()
      .subscribe((result) => {
        if (result.status > 0) {
          let summary = result.data;
          this.clientsCount = summary.clientsCount;
          this.adminUsersCount = summary.adminUsersCount;
          this.brokersCount = summary.brokersCount;
          this.companiesCount = summary.companiesCount;
          this.formsPurchased = summary.formsPurchases;
          this.invoicedAmount = summary.invoiceAmount;
          this.recievedAmount = summary.recievedAmount;
          this.countOfSignedContracts = summary.signedContracts;
          this.selfInsuredPlans = summary.selfInsuredPlans;
          this.purchasesCount = summary.purchasesCount;
        }
      },
      error => { this._errorMessage = error.data }
      );
  }
}