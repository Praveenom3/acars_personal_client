import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PlanClassesService } from "app/_services/_plan-classes.service";
import { ElementMasterService } from "app/_services/_element-master.service";
import { ToastrService } from "ngx-toastr";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-coverage-type',
  templateUrl: './coverage-type.component.html',
  styleUrls: ['./coverage-type.component.css']
})

export class CoverageTypeComponent implements OnInit {
  client_id: any;
  purchase_id: any;
  companyDetails: any;
  coverageTypeData: { plan_class_id: number; company_id: number; plan_class_number: string; plan_class_name: string; plan_offer_type: string; plan_type_doh: string; employee_medical_plan: string; coverageType: string[]; waitingType: string[]; created_at: string; created_by: string; updated_at: string; updated_by: string; };
  label: string;

  company: string;
  product: string;
  company_id: any;
  product_id: any;
  encodedId: string = null;
  id: number = null;

  section_id: any = 9;
  public labels: any[] = [];

  _errorMessage: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    public globalService: GlobalService,
    private _elementMasterService: ElementMasterService,
    private planClassesService: PlanClassesService) {

    this.product_id = globalService.decode(route.snapshot.params['product']);
    this.company_id = globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];

    this.encodedId = route.snapshot.params['encodedId'];

    if (this.encodedId) {
      this.id = globalService.decode(this.encodedId);
    }

  }

  ngOnInit() {
    this.coverageTypeData = this.createNewCoverageType();
    this.ElementLabelsList();
    this.getCompany();

    if (this.id) {
      this.getCoverageTypeData();
    } else {
      this.planClassesService.getMaxPlanClassNumber(this.company_id)
        .subscribe((data) => {
          this.coverageTypeData.plan_class_number = data.maxPlanClassNumber;
        },
        error => { this._errorMessage = error.data }
        );
    }
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

  createNewCoverageType() {
    // Create a new Brand
    let coverageType = {
      plan_class_id: 0,
      company_id: 0,
      plan_class_number: '',
      plan_class_name: '',
      plan_offer_type: '',
      plan_type_doh: '',
      employee_medical_plan: '',
      coverageType: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      waitingType: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: ''
    }
    return coverageType;
  }

  resetSelectTypes(type) {
    if (type == "plan_type_doh") {
      this.coverageTypeData.waitingType = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
    } else if (type == "plan_offer_type") {
      this.coverageTypeData.plan_type_doh = '';
      this.coverageTypeData.coverageType = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
      this.coverageTypeData.waitingType = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
    }
  }

  /*getting data from service*/
  private getCoverageTypeData() {
    let planClassData = this.route.snapshot.data['data'];
    if (planClassData.planClassInformation) {

      this.coverageTypeData.plan_class_id = planClassData.planClassInformation.plan_class_id;
      this.coverageTypeData.plan_class_number = planClassData.planClassInformation.plan_class_number;
      this.coverageTypeData.plan_class_name = planClassData.planClassInformation.plan_class_name;
      this.coverageTypeData.plan_offer_type = planClassData.planClassInformation.plan_offer_type;
      this.coverageTypeData.plan_type_doh = planClassData.planClassInformation.plan_type_doh;
      this.coverageTypeData.employee_medical_plan = planClassData.planClassInformation.employee_medical_plan;

      let planOfferTypeYear = planClassData.planClassInformation.planOfferTypeYear;

      if (this.coverageTypeData.plan_offer_type != '1') {
        if (this.coverageTypeData.plan_offer_type == '5') {

          this.coverageTypeData.coverageType = this.AssignMonths(planOfferTypeYear, 1);
          this.coverageTypeData.waitingType = this.AssignMonths(planOfferTypeYear, 3);
        } else if (this.coverageTypeData.plan_type_doh == '9') {
          this.coverageTypeData.waitingType = this.AssignMonths(planOfferTypeYear, 2);
        }
      }
    }

  }

  private AssignMonths(data, combination_type) {

    let MonthFields: any[] = [];
    if (data.length > 0) {

      data.forEach(eachSelectedMonth => {

        if (eachSelectedMonth.combination_type == combination_type) {
          MonthFields[eachSelectedMonth.plan_month] = eachSelectedMonth.plan_month_value;
        }
      });
      for (let i = 1; i <= 12; i++) {
        if (!MonthFields[i]) {
          MonthFields[i] = "";
        }
      }

    } else {
      MonthFields = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
    }
    return MonthFields;
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

  public redirectToDashboard() {
    this.router.navigate(['client/' + this.product + '/' + this.globalService.encode(this.client_id) + '/dashboard']);
  }


  /*on submit sending form data to service.It is for both add and update*/
  public onSubmit(param) {

    let customCoverageTypeArray = [];
    if (this.coverageTypeData.coverageType.length > 0) {
      this.coverageTypeData.coverageType.forEach((eachSelectedMonth, index) => {
        if (eachSelectedMonth) {
          customCoverageTypeArray[index] = eachSelectedMonth;
        }
      });
    }

    let customWaitingTypeArray = [];
    if (this.coverageTypeData.waitingType.length > 0) {
      this.coverageTypeData.waitingType.forEach((eachSelectedMonth, index) => {
        if (eachSelectedMonth) {
          customWaitingTypeArray[index] = eachSelectedMonth;
        }
      });
    }

    this.coverageTypeData.coverageType = customCoverageTypeArray;
    this.coverageTypeData.waitingType = customWaitingTypeArray;
    this.coverageTypeData['company_id'] = this.company_id;

    if (this.coverageTypeData.plan_class_id > 0) {
      this.planClassesService.updateCoverageType(this.coverageTypeData).subscribe(
        result => {
          if (result.success) {
            this.encodedId = this.globalService.encode(result.data.PlanClassCoverageTypeInformation.plan_class_id);
            if (param == "exit") {
              this.redirectToDashboard();
            } else {
              this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/plan-classes/plan-class/' + this.encodedId + '/coverage-offered']);
            }
            // this.toastrService.success('Coverage Type Information record added succesfully.');
          } else {
            this._errorMessage = 'Not Added.';
          }
        },
        error => {
        });
    } else {
      this.planClassesService.createCoverageType(this.coverageTypeData).subscribe(
        result => {
          if (result.success) {
            this.encodedId = this.globalService.encode(result.data.PlanClassCoverageTypeInformation.plan_class_id);
            if (param == "exit") {
              this.redirectToDashboard();
            } else {
              this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/plan-classes/plan-class/' + this.encodedId + '/coverage-offered']);
            }
            //  this.toastrService.success('Coverage Type Information record updated succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    }

  }

}
