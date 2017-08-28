import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ElementMasterService } from "app/_services/_element-master.service";
import { BriBasicInfo } from "app/_models/bri-basic-info";
import { BriBasicInfoService } from "app/_services/_bri-basic-info.service";
import { ToastrService } from "ngx-toastr";
import { ROUTER_PROVIDERS } from "@angular/router/src/router_module";
import { GlobalService } from "app/_services/_global.service";
@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
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

  constructor(route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private globalService: GlobalService,
    private _elementMasterService: ElementMasterService,
    private _briBasicInfoService: BriBasicInfoService) {
    this.product_id = this.product = globalService.decode(route.snapshot.params['product']);
    this.company_id = this.company = globalService.decode(route.snapshot.params['company']);
  }

  ngOnInit() {
    this.basicInfoData = this.createNewBasicInfo();
    this.ElementLabelsList();
    this.getStates();
    this.getBasicInfoData();
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
  private ElementLabelsList() {
    this._elementMasterService.getLabels(this.section_id, this.product_id)
      .subscribe((labels) => {
        for (let label of labels) {
          this.label = label.element_serial_id + ' ' + label.element_label;
          this.labels.push(this.label);
        }
      },
      error => { this._errorMessage = error.data }
      );
  }

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
  private getBasicInfoData() {
    this._briBasicInfoService.getbasicInfoData(this.company_id)
      .subscribe((basicData) => {
        if (basicData) {
          this.basicInfoData = basicData;
        }
      },
      error => { this._errorMessage = error.data }
      );
  }


  private formSubmit(param) {
    if (this.basicInfoData.basic_info_id > 0) {
      this.basicInfoData['purchase_id'] = this.product_id;
      this.basicInfoData['company_id'] = this.company_id;
      this._briBasicInfoService.updateBriBasicInfo(this.basicInfoData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.globalService.encode(this.product) + '/' + this.globalService.encode(this.company);
            if (param == "exit") {
              this.router.navigate([url]);
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
      this.basicInfoData['purchase_id'] = '1';
      this.basicInfoData['company_id'] = '1';
      this._briBasicInfoService.addBasicInfo(this.basicInfoData).subscribe(
        result => {
          // console.log(result.success);
          if (result.success) {
            let url: string = 'client/' + this.globalService.encode(this.product) + '/' + this.globalService.encode(this.company);
            if (param == "exit") {
              this.router.navigate([url]);
            } else {
              this.router.navigate([url + 'employer-info/basic-reporting-info/emp-status-tracking']);
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