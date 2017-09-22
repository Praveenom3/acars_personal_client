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
  company: string;
  product: string;
  constructor(public route: ActivatedRoute,
    public clientDashBoardService: ClientDashBoardService,
    public router: Router, private _globalService: GlobalService) {
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
    this.companyData = this.infoObject();
    let labelsData = this.route.snapshot.data['labels'];
    if (labelsData) {
      this.companyData = labelsData.company;
    }
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



