import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GlobalService } from "app/_services/_global.service";
import { ModalDirective } from "ngx-bootstrap";
@Component({
  selector: 'client-reporting-band',
  templateUrl: './client-reporting-band.component.html',
  styleUrls: ['./client-reporting-band.component.css']
})
export class ClientReportingBandComponent implements OnInit {
  @ViewChild('companyUploadDataFile') public companyUploadDataFile: ModalDirective;

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

  /**
   * 
   */
  public uploadDataFiles() {
    let today: any = new Date().getTime();
    var uploadDate: any = new Date("2017-10-15").getTime();
    if (parseInt(today) < parseInt(uploadDate)) {
        this.companyUploadDataFile.show();
    } 
  }


  /**
   * 
   */
  public closeUploadDataModal() {
    this.companyUploadDataFile.hide();
  }

}