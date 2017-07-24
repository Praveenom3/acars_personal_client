import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
declare var $:any;

@Component({
  selector: 'app-reporting-check-list',
  templateUrl: './reporting-check-list.component.html',
  styleUrls: ['./reporting-check-list.component.css']
})
export class ReportingCheckListComponent implements OnInit {
  company: string;
  product: string;

  public isInvoicePaid:boolean = true;
  public isAgreementSigned:boolean = true;
  public isDiscoveryCallDone:boolean = true;

  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  toggleInvoicePayment() {
    this.isInvoicePaid = !this.isInvoicePaid;       
  }
  toggleAgreementSign() {
    this.isAgreementSigned = !this.isAgreementSigned;       
  }
  toggleDiscoveryCallStatus() {
    this.isDiscoveryCallDone = !this.isDiscoveryCallDone;       
  }


  ngOnInit() {
    $("#companies").select2({
      tags: true
    })
  }

}
