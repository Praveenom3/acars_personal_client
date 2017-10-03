import { Component, OnInit, Directive } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';
import { GlobalService } from "app/_services/_global.service";
import { ClientDashBoardService } from 'app/_services/_client-dashboard.service';
const URL = '/api/';


@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})


@Directive({ selector: '[ng2FileSelect,ng2FileDrop]' })

export class UploadDocumentsComponent implements OnInit {
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
    private _globalService: GlobalService,
    public clientDashBoardService: ClientDashBoardService,) {
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
    let products = this._globalService.getProducts();
    let productYear = products[this.product_id]['applicable_year'];
    if (companyDet) {
      this.companyDetails = JSON.parse(companyDet);
      this.companyDetails.productYear = productYear;
      this.companyDetails['product'] = this.product;
      this.purchase_id = this._globalService.decode(this.companyDetails.purchase_id);
      this.client_id = this._globalService.decode(this.companyDetails.client_id);
    }
  }
}
