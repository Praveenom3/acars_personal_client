import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'client-company-info',
  templateUrl: './client-company-info.component.html',
  styleUrls: ['./client-company-info.component.css']
})
export class ClientCompanyInfoComponent implements OnInit {
  product_year: any;
  company_ein: any;
  company_name: string;

  @Input()
  companyData: any;

  constructor() { }

  ngOnInit() {
  }

}
