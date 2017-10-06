import { Component, OnInit, Directive } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "app/_services/_global.service";
import { SettingsService } from 'app/_services/_setting.service';
import { ClientDashBoardService } from 'app/_services/_client-dashboard.service';


@Component({
  selector: 'app-documents-history',
  templateUrl: './documents-history.component.html',
  styleUrls: ['./documents-history.component.css']
})

export class DocumentsHistoryComponent implements OnInit {
  company: string;
  product: string;
  companyDetails: any;
  product_id: any;
  company_id: any;
  client_id: any;
  purchase_id: any;


  constructor(route: ActivatedRoute,
    public router: Router,
    private _globalService: GlobalService) {
    this.product_id = _globalService.decode(route.snapshot.params['product']);
    this.company_id = _globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];

  }

  ngOnInit() {
    this.getCompany();
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

  public redirectToEmployeeData(step: string) {
    this.router.navigate(['/client/'+this.product+'/'+this.company+'/employer-info/payroll/upload-documents']);
  }
}
