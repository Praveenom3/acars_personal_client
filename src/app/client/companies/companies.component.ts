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
  constructor(route: ActivatedRoute) {
    this.product = route.snapshot.params['product'];
    this.productId = 1;
    this.setClientsInfo()
  }


  ngOnInit() {
    $("#companies").select2({
      tags: true
    })
  }
  /**
    * Setting Client information used in dash board for displaying clients and companies
    */
  protected setClientsInfo() {
    let clients = JSON.parse(localStorage.getItem('clientsAndCompanies'));
    this.clients = clients[this.productId]['clients'];
    this.clients = Object.keys(this.clients)
      .map((key) => ({ 'key': key, 'value': this.clients[key] }));
  }
}
