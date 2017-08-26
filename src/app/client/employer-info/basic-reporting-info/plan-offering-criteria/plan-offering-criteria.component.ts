import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PlanOfferingCriteria } from "app/_models/plan-offering-criteria";
import { ToastrService } from "ngx-toastr";
import { PlanOfferingCriteriaService } from "app/_services/_plan-offering-criterial.service";
import { ElementMasterService } from "app/_services/_element-master.service";

@Component({
  selector: 'app-plan-offering-criteria',
  templateUrl: './plan-offering-criteria.component.html',
  styleUrls: ['./plan-offering-criteria.component.css']
})
export class PlanOfferingCriteriaComponent implements OnInit {

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

  constructor(route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private _planOfferingCriteriaService: PlanOfferingCriteriaService,
    private _elementMasterService: ElementMasterService) {
    this.product_id = this.product = route.snapshot.params['product'];
    this.company_id = this.company = route.snapshot.params['company'];

    /*  let splittedProduct: any[] = [];
     let splittedCompany: any[] = [];
 
     if (this.product) {
       splittedProduct = this.product.split("-");
       this.product_id = splittedProduct[0];
     }
 
     if (this.company) {
       splittedCompany = this.company.split("-");
       this.company_id = splittedCompany[0];
     } */
  }

  ngOnInit() {
    this.ElementLabelsList();
    this.planOfferingData = this.createNewPlanOfferingCriteria();
    this.getPlanOfferData();
  }

  handleChange(value) {
    if (value != 1) {
      this.planOfferingData.initial_measurement_period = '';
      this.planOfferingData.initial_measurement_period_begin = '';
    }
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

  /*getting data from service*/
  private getPlanOfferData() {
    this._planOfferingCriteriaService.getPlanOfferData(this.company_id)
      .subscribe((planOfferData) => {
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
      },
      error => { this._errorMessage = error.data }
      );
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


  private formSubmit(param) {
    let customArray = [];
    console.log(this.planOfferingData);
    this.planOfferingData.plan_offering_criteria_type.forEach((eachSelectedMethod, index) => {
      if (eachSelectedMethod == true) {
        customArray.push(index);
      }
    });

    this.planOfferingData['purchase_id'] = this.product_id;
    this.planOfferingData['company_id'] = this.company_id;
    this.planOfferingData['plan_offering_criteria_type'] = JSON.stringify(customArray);
    if (this.planOfferingData.plan_offer_criteria_id > 0) {
      this._planOfferingCriteriaService.updatePlanOfferingCriteria(this.planOfferingData).subscribe(
        result => {
          if (result.success) {
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this.company]);
            } else {
              this.router.navigate(['client/' + this.product + '/' + this.company + '/' + 'employer-info/basic-reporting-info/designated-govt-entity']);
            }
            //this.getPlanOfferData();
            this.planOfferingData = this.createNewPlanOfferingCriteria();
            this.toastrService.success('Plan Offering Criteria record updated succesfully.');
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
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this.company]);
            } else {
              this.router.navigate(['client/' + this.product + '/' + this.company + '/' + 'employer-info/basic-reporting-info/designated-govt-entity']);
            }
            //this.getPlanOfferData();
            this.planOfferingData = this.createNewPlanOfferingCriteria();
            this.toastrService.success('Plan Offering Criteria record added succesfully.');
          } else {
            this._errorMessage = 'Not added.';
          }
        },
        error => {
        });
    }
  }

}