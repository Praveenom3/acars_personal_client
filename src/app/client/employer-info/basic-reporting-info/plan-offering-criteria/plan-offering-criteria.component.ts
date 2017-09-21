import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PlanOfferingCriteria } from "app/_models/plan-offering-criteria";
import { ToastrService } from "ngx-toastr";
import { PlanOfferingCriteriaService } from "app/_services/_plan-offering-criterial.service";
import { ElementMasterService } from "app/_services/_element-master.service";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-plan-offering-criteria',
  templateUrl: './plan-offering-criteria.component.html',
  styleUrls: ['./plan-offering-criteria.component.css']
})
export class PlanOfferingCriteriaComponent implements OnInit {
  labelsData: any = '';
  employer_info_container_width: number = 1240;
  client_id: any;
  purchase_id: any;
  companyDetails: any;

  planOfferingData: PlanOfferingCriteria;
  _errorMessage: any;

  public labels: any[] = [];
  label: string;
  company: string;
  product: string;

  section_id: any = 3;
  product_id: any;
  company_id: any;
  public serverChk = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private _planOfferingCriteriaService: PlanOfferingCriteriaService,
    private _globalService: GlobalService,
    private _elementMasterService: ElementMasterService) {
    this.product_id = _globalService.decode(route.snapshot.params['product']);
    this.company_id = _globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
    this.employer_info_container_width = document.getElementById("manage-plan-tabs").offsetWidth;
	
    this.ElementLabelsList();
    this.planOfferingData = this.createNewPlanOfferingCriteria();
    this.getPlanOfferData();
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

  handleChange(value) {
    if (value != 1) {
      this.planOfferingData.initial_measurement_period = '';
      this.planOfferingData.initial_measurement_period_begin = '';
    }
  }

  /*getting labels from service*/
  private ElementLabelsList() {
    this.labelsData = this.route.snapshot.data['labels'];
    if (this.labelsData) {
      for (let label of this.labelsData) {
        this.label = label.element_serial_id + ' ' + label.element_label;
        this.labels.push(this.label);
      }
    }
  }

  /*getting data from service*/
  private getPlanOfferData() {
    let planOfferData = this.route.snapshot.data['data'];
    if (planOfferData) {
      this.planOfferingData = planOfferData;
      if (this.planOfferingData.plan_offering_criteria_type) {
        this.planOfferingData.plan_offering_criteria_type = JSON.parse(this.planOfferingData.plan_offering_criteria_type);
        let criteriaType: any[] = [];
        this.planOfferingData.plan_offering_criteria_type.forEach((hearAboutElement, index) => {
          criteriaType[hearAboutElement] = true;
        });
        this.planOfferingData.plan_offering_criteria_type = [];
        this.planOfferingData.plan_offering_criteria_type = criteriaType;
      }
    }
  }


  createNewPlanOfferingCriteria() {
    // Create a new PlanOfferingCriteria
    let newPlanOfferingCriteria: PlanOfferingCriteria = {
      plan_offer_criteria_id: 0,
      company_id: 0,
      purchase_id: 0,
      hours_tracking_method: '',
      initial_measurement_period: '',
      initial_measurement_period_begin: '',
      plan_offering_criteria_type: [],
      company_certification_workforce: '',
      company_certification_medical_eligibility: '',
      company_certification_employer_contribution: '',
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: '',
    }
    return newPlanOfferingCriteria;
  }

  public redirectToDashboard() {
    this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
  }

  public redirectToPrevious() {
    this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/basic-reporting-info/emp-status-tracking']);
  }

  private formSubmit(param) {
    let customArray = [];
    this.planOfferingData.plan_offering_criteria_type.forEach((eachSelectedMethod, index) => {
      if (eachSelectedMethod == true) {
        customArray.push(index);
      }
    });

    this.planOfferingData['purchase_id'] = this.purchase_id;
    this.planOfferingData['company_id'] = this.company_id;
    //this.planOfferingData['plan_offering_criteria_type'] = JSON.stringify(customArray);

    if (this.planOfferingData.plan_offer_criteria_id > 0) {
      this._planOfferingCriteriaService.updatePlanOfferingCriteria(this.planOfferingData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
            } else {
              this.router.navigate([url + '/' + 'employer-info/basic-reporting-info/designated-govt-entity']);
            }
            //this.getPlanOfferData();
            //this.toastrService.success('Plan Offering Criteria record updated succesfully.');
          } else {
            this._errorMessage = 'Not updated.';
          }
        },
        error => {
        });
    }
    else {
      this._planOfferingCriteriaService.addPlanOfferingCriteria(this.planOfferingData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
            } else {
              this.router.navigate([url + '/' + 'employer-info/basic-reporting-info/designated-govt-entity']);
            }
            //this.getPlanOfferData();
            // this.toastrService.success('Plan Offering Criteria record added succesfully.');
          } else {
            this._errorMessage = 'Not added.';
          }
        },
        error => {
        });
    }
  }

}