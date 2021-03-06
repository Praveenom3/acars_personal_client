import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ElementMasterService } from "app/_services/_element-master.service";
import { GeneralPlanInfo } from "app/_models/general-plan-info";
import { GeneralPlanInfoService } from "app/_services/_general-plan-info.service";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-general-plan-information',
  templateUrl: './general-plan-information.component.html',
  styleUrls: ['./general-plan-information.component.css']
})
export class GeneralPlanInformationComponent implements OnInit {
  labelsData: any = '';
  employer_info_container_width: number;
  client_id: any;
  purchase_id: any;
  companyDetails: any;
  generalPlanInfoData: GeneralPlanInfo;
  _errorMessage: any;
  label: string;
  company: any;
  product: any;

  section_id: any = 7;
  product_id: any;
  company_id: any;
  public labels: any[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private _generalPlanInfoService: GeneralPlanInfoService,
    private _globalService: GlobalService,
    private _elementMasterService: ElementMasterService) {
    this.product_id = _globalService.decode(route.snapshot.params['product']);
    this.company_id = _globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];

  }

  ngOnInit() {
    this.employer_info_container_width = 91;
	
    this.generalPlanInfoData = this.createNewGeneralPlanInfo();
    this.ElementLabelsList();
    this.getGeneralPlanInfoData();
    this.getCompany();
  }

  createNewGeneralPlanInfo() {
    // Create a new BasicInfo
    let newGeneralPlanInfo: GeneralPlanInfo = {
      general_plan_id: 0,
      company_id: 0,
      purchase_id: 0,
      is_first_year: '',
      renewal_month: '',
      plan_type_description: '',
      is_multiple_waiting_periods: '',
      multiple_description: '',
      is_employees_hra: '',
      offer_type: '',
      months: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: ''
    }
    return newGeneralPlanInfo;
  }

  handleChange(value) {
    if (value != 1) {
      this.generalPlanInfoData.multiple_description = '';
    }
  }

  changeOfferType(value) {
    if (value != 1) {
      this.generalPlanInfoData.months = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
    }
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

  /*getting labels from service*/
  private ElementLabelsList() {
    this.labelsData = this.route.snapshot.data['labels'].labels;
    if (this.labelsData) {
      for (let label of this.labelsData) {
        this.label = label.element_serial_id + ' ' + label.element_label;
        this.labels.push(this.label);
      }
    }
  }

  /*getting data from service*/
  private getGeneralPlanInfoData() {
    let generalData = this.route.snapshot.data['data'];
    if (generalData) {
      this.generalPlanInfoData = generalData;
      if (this.generalPlanInfoData.months.length > 0) {
        let MonthFields: any[] = [];
        this.generalPlanInfoData.months.forEach((eachSelectedMonth, index) => {
          MonthFields[eachSelectedMonth.month_id] = eachSelectedMonth.plan_value;
        });
        for (let i = 1; i <= 12; i++) {
          if (!MonthFields[i]) {
            MonthFields[i] = "";
          }
        }
        this.generalPlanInfoData.months = [];
        this.generalPlanInfoData.months = MonthFields;
      } else {
        this.generalPlanInfoData.months = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
      }
    }
  }


  public redirectToDashboard() {
    this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
  }

  public redirectToPrevious() {
    this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/basic-reporting-info/anything-else']);
  }

  private formSubmit(param) {
    let customArray = [];
    if (this.generalPlanInfoData.months.length > 0) {
      this.generalPlanInfoData.months.forEach((eachSelectedMonth, index) => {
        if (eachSelectedMonth) {
          customArray[index] = eachSelectedMonth;
        }
      });
    }

    this.generalPlanInfoData.months = customArray;
    this.generalPlanInfoData['purchase_id'] = this.purchase_id;
    this.generalPlanInfoData['company_id'] = this.company_id;
    if (this.generalPlanInfoData.general_plan_id > 0) {
      this._generalPlanInfoService.updateGeneralPlanInfo(this.generalPlanInfoData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
            } else {
              this.router.navigate([url + '/' + 'employer-info/benefit-plan-info/mec-coverage']);
            }

            //this.getGeneralPlanInfoData();
           // this.toastrService.success('General Plan Information record added succesfully.');
          } else {
            this._errorMessage = 'Not Added.';
          }
        },
        error => {
        });
    } else {
      this._generalPlanInfoService.addGeneralPlanInfo(this.generalPlanInfoData).subscribe(
        result => {
          // console.log(result.success);
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
            } else {
              this.router.navigate([url + '/' + 'employer-info/benefit-plan-info/mec-coverage']);
            }
            //this.getGeneralPlanInfoData();
          //  this.toastrService.success('General Plan Information record updated succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    }
  }

}
