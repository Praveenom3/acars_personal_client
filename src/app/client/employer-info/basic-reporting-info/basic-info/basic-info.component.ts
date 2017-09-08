import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ElementMasterService } from "app/_services/_element-master.service";
import { BriBasicInfo } from "app/_models/bri-basic-info";
import { BriBasicInfoService } from "app/_services/_bri-basic-info.service";
import { ToastrService } from "ngx-toastr";
import { ROUTER_PROVIDERS } from "@angular/router/src/router_module";
import { GlobalService } from "app/_services/_global.service";
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  productYear: any;
  initialCount: number = 10;
  company_name: any;
  client_id: any;
  purchase_id: any;
  companyDetails: any;
  states: any;

  basicInfoData: BriBasicInfo;
  label: string;
  abccd: string;
  element_label: string;
  section_id: any = 1;
  product_id: any;
  company_id: any;
  public labels: any[] = [];
  _errorMessage: any;

  model: any = {};
  company: string;
  product: string;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private globalService: GlobalService,
    private _clientDashService: ClientDashBoardService,
    private _elementMasterService: ElementMasterService,
    private _briBasicInfoService: BriBasicInfoService) {

    this.product_id = globalService.decode(route.snapshot.params['product']);
    this.company_id = globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];

  }

  ngOnInit() {
    this.basicInfoData = this.createNewBasicInfo();
    let labelsData = this.route.snapshot.data['labels'];
    let basicInfoData = this.route.snapshot.data['data'];
    if (labelsData) {
      for (let label of labelsData) {
        this.label = label.element_serial_id + ' ' + label.element_label;
        this.labels.push(this.label);
      }
    }
    if (basicInfoData) {
      this.basicInfoData = basicInfoData;
    }
    this.getCompany();
    this.getStates();

  }

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

  createNewBasicInfo() {
    // Create a new BasicInfo
    let newBasicInfo: BriBasicInfo = {
      basic_info_id: 0,
      company_id: 0,
      purchase_id: 0,
      contact_first_name: '',
      contact_middle_name: '',
      contact_last_name: '',
      contact_person_suffix: '',
      contact_person_title: '',
      contact_person_email: '',
      contact_phone_number: '',
      street_address_1: '',
      street_address_2: '',
      contact_country: 1,
      contact_state: null,
      contact_city: '',
      contact_zip: '',
      emp_benefit_broker_name: '',
      emp_benefit_broker_email: '',
      emp_benefit_phone_number: '',
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: ''
    }
    return newBasicInfo;
  }

  /*getting labels from service*/
  /* private ElementLabelsList() {
     this._elementMasterService.getLabels(this.section_id, this.product_id)
       .subscribe((labels) => {
         for (let label of labels) {
           this.label = label.element_serial_id + ' ' + label.element_label;
           this.labels.push(this.label);
         }
       },
       error => { this._errorMessage = error.data }
       );
   }*/

  // getStates
  private getStates() {
    this._briBasicInfoService.getStates()
      .subscribe((states) => {
        this.states = states;
      },
      error => { this._errorMessage = error.data }
      );
  }

  /*getting data from service*/
  /* private getBasicInfoData() {
     this._briBasicInfoService.getbasicInfoData(this.company_id)
       .subscribe((basicData) => {
         if (basicData) {
           this.basicInfoData = basicData;
         }
       },
       error => { this._errorMessage = error.data }
       );
   }*/

  public redirectToDashboard() {
    this.router.navigate(['client/' + this.product + '/' + this.globalService.encode(this.client_id) + '/dashboard']);
  }

  private formSubmit(param) {
    if (this.basicInfoData.basic_info_id > 0) {
      this.basicInfoData['purchase_id'] = this.purchase_id;
      this.basicInfoData['company_id'] = this.company_id;
      this._briBasicInfoService.updateBriBasicInfo(this.basicInfoData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.redirectToDashboard();
            } else {
              this.router.navigate([url + '/' + 'employer-info/basic-reporting-info/emp-status-tracking']);
            }
            this.toastrService.success('Basic Info record updated succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    } else {
      this.basicInfoData['purchase_id'] = this.purchase_id;
      this.basicInfoData['company_id'] = this.company_id;
      this._briBasicInfoService.addBasicInfo(this.basicInfoData).subscribe(
        result => {
          // console.log(result.success);
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.redirectToDashboard();
            } else {
              this.router.navigate([url + '/' + 'employer-info/basic-reporting-info/emp-status-tracking']);
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