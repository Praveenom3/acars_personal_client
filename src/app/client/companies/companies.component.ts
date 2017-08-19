import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  product: string;
  productId: number;
  public clients = [];
  public clientsTableData = [];

  public isInvoicePaid: boolean = true;
  public isAgreementSigned: boolean = true;
  public isDiscoveryCallDone: boolean = true;

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortOrder = "asc";
  public sortBy = "";

  constructor(route: ActivatedRoute) {
    this.product = route.snapshot.params['product'];
    this.productId = 1;
    this.setClientsInfo()
    this.clientsTableData =[
      {company:'abcd',EIN:'1213'},
      {company:'company1',EIN:'324'},
      {company:'cargo force',EIN:'5345'},
      {company:'cargo 2',EIN:'5345'}
    ]; 
  }


  ngOnInit() {
    $("#companies").select2({
      tags: true
    })
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

  
                         

  /**
    * Setting Client information used in dash board for displaying clients and companies
    */
  protected setClientsInfo() {
  let clients = JSON.parse(localStorage.getItem('clientsAndCompanies'));
  this.clients = clients[this.productId]['clients'];
  this.clients = Object.keys(this.clients)
    .map((key) => ({ 'key': key, 'value': this.clients[key] }));
  console.log(this.clients);
}
}
