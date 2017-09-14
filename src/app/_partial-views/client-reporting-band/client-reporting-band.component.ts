import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'client-reporting-band',
  templateUrl: './client-reporting-band.component.html',
  styleUrls: ['./client-reporting-band.component.css']
})
export class ClientReportingBandComponent implements OnInit {
  companyData: any;
  company: string;
  product: string;
  constructor(route: ActivatedRoute, private _globalService: GlobalService) {
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
    this.companyData = JSON.parse(this._globalService.getCompany());
  }

}