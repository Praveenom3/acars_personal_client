import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ElementMasterService } from "app/_services/_element-master.service";
import { AnythingElse } from "app/_models/anything-else";
import { AnythingElseService } from "app/_services/_anything-else.service";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-anything-else',
  templateUrl: './anything-else.component.html',
  styleUrls: ['./anything-else.component.css']
})
export class AnythingElseComponent implements OnInit {
  client_id: any;
  purchase_id: any;
  companyDetails: any;

  customArray: any[] = [];
  anythingElseData: AnythingElse;
  label: string;
  company: string;
  product: string;

  section_id: any = 6;
  product_id: any;
  company_id: any;

  public labels: any[] = [];
  _errorMessage: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private globalService: GlobalService,
    private _anythingElseService: AnythingElseService,
    private _elementMasterService: ElementMasterService
  ) {
    this.product_id = globalService.decode(route.snapshot.params['product']);
    this.company_id = globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
    this.anythingElseData = this.createNewAnythingElse();
    this.ElementLabelsList();
    this.getAnythingElseData();
    this.getCompany();
  }

  handleChange(e) {
    if (e.target.checked == false) {
      this.anythingElseData.others = '';
    }
  }
  createNewAnythingElse() {
    // Create a new AnythingElse
    let newAnythingElse: AnythingElse = {
      additional_details_id: 0,
      company_id: 0,
      purchase_id: 0,
      hear_about_us: [],
      others: '',
      anything_else: '',
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: ''
    }
    return newAnythingElse;
  }

  /*GET COMPANY DETAILS AND PRODUCT YEAR*/
  getCompany() {
    let companyDet = this.globalService.getCompany();
    let products = this.globalService.getProducts();
    let productYear = products[this.product_id]['applicable_year'];
    if (companyDet) {
      this.companyDetails = JSON.parse(companyDet);
      this.companyDetails.productYear = productYear;
      this.companyDetails['product'] = this.product;
      this.purchase_id = this.globalService.decode(this.companyDetails.purchase_id);
      this.client_id = this.globalService.decode(this.companyDetails.client_id);
    }
  }

  /*getting labels from service*/
  private ElementLabelsList() {
    let labelsData = this.route.snapshot.data['labels'];
    if (labelsData) {
      for (let label of labelsData) {
        this.label = label.element_serial_id + ' ' + label.element_label;
        this.labels.push(this.label);
      }
    }
  }

  /*getting labels from service*/
  private getAnythingElseData() {
    let anythingData = this.route.snapshot.data['data'];
    if (anythingData) {
      this.anythingElseData = anythingData;
      this.anythingElseData.hear_about_us = JSON.parse(this.anythingElseData.hear_about_us);
      let hearAboutData: any[] = [];
      this.anythingElseData.hear_about_us.forEach((hearAboutElement, index) => {
        hearAboutData[hearAboutElement] = true;
      });
      this.anythingElseData.hear_about_us = [];
      this.anythingElseData.hear_about_us = hearAboutData;
    }

  }

  public redirectToDashboard() {
    this.router.navigate(['client/' + this.product + '/' + this.globalService.encode(this.client_id) + '/dashboard']);
  }

  private formSubmit(param) {
    this.customArray = [];
    this.anythingElseData.hear_about_us.forEach((hearAboutElement, index) => {
      if (hearAboutElement == true) {
        this.customArray.push(index);
      }
    });

    this.anythingElseData['purchase_id'] = this.purchase_id;
    this.anythingElseData['company_id'] = this.company_id;
    if (this.anythingElseData.additional_details_id > 0) {
      this.anythingElseData['hear_about_us'] = JSON.stringify(this.customArray);
      this._anythingElseService.updateAnythingElse(this.anythingElseData).subscribe(
        result => {
          if (result.success) {
            //this.getAnythingElseData();
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.redirectToDashboard()
            } else {
              this.router.navigate([url + '/' + 'employer-info/benefit-plan-info']);
            }
            this.toastrService.success('Basic Info record updated succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    }
    else {
      this.anythingElseData['hear_about_us'] = JSON.stringify(this.customArray);
      this._anythingElseService.addAnythingElse(this.anythingElseData).subscribe(
        result => {
          if (result.success) {
            // this.getAnythingElseData();
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.redirectToDashboard();
            } else {
              this.router.navigate([url + '/' + 'employer-info/benefit-plan-info']);
            }

            this.toastrService.success('Basic Info record added succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    }
  }

}