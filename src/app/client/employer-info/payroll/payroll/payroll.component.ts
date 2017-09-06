import { Component, OnInit, Directive } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';
import { GlobalService } from "app/_services/_global.service";
const URL = '/api/';


@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})


@Directive({ selector: '[ng2FileSelect,ng2FileDrop]' })

export class PayrollComponent implements OnInit {
  company: string;
  product: string;
  companyDetails: any;
  product_id: any;
  company_id: any;
  client_id: any;
  purchase_id: any;
  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;


  constructor(route: ActivatedRoute,
    private _globalService: GlobalService, ) {
    this.product_id = _globalService.decode(route.snapshot.params['product']);
    this.company_id = _globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];

  }

  ngOnInit() {
    this.getCompany();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  /*GET COMPANY DETAILS AND PRODUCT YEAR*/
  getCompany() {
    let companyDet = this._globalService.getCompany();
    let products = JSON.parse(localStorage.getItem('productsAndClients'));
    let productYear = products[this.product_id]['applicable_year'];
    if (companyDet) {
      this.companyDetails = JSON.parse(companyDet);
      this.companyDetails.productYear = productYear;
      this.companyDetails['product'] = this.product;
      this.companyDetails['clientEncodedId'] = this._globalService.encode(this.companyDetails.client_id);
      this.purchase_id = this.companyDetails.purchase_id;
      this.client_id = this.companyDetails.client_id;
    }
  }
}
