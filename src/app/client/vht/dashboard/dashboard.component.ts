import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  company: string;
  product: string;

  public isInvoicePaid:boolean = true;
  public isAgreementSigned:boolean = true;
  public isDiscoveryCallDone:boolean = true;

  constructor(route: ActivatedRoute) { 
   // this.product = route.snapshot.params['product'];
   this.product = 'vht';
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
