import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "app/_services/_global.service";
import { ClientDashBoardService } from 'app/_services/_client-dashboard.service';

@Component({
  selector: 'client-reporting-band',
  templateUrl: './client-reporting-band.component.html',
  styleUrls: ['./client-reporting-band.component.css']
})
export class ClientReportingBandComponent implements OnInit {
  companyData: { basicReporting: string; benefitPlan: string; planClasses: string; };
  company_id: any;
  company: string;
  product: string;
  constructor(public route: ActivatedRoute,
    public clientDashBoardService: ClientDashBoardService,
    public router: Router, private _globalService: GlobalService) {
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
    this.company_id = _globalService.decode(route.snapshot.params['company']);
  }

  ngOnInit() {
    this.companyData = this.infoObject();
    let companyDatas = this.clientDashBoardService.getIsCompletedInfo(this.company_id);
    companyDatas.subscribe((info) => {
      this.companyData =info;
      console.log(this.companyData);
    },
      error => { }
    );
  }

  infoObject() {
    // Create a new Element
    let newElement = {
      basicReporting: '',
      benefitPlan: '',
      planClasses: ''
    }
    return newElement;
  }

}



