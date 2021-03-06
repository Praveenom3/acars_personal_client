import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PlanClassesService } from "app/_services/_plan-classes.service";
import { ElementMasterService } from "app/_services/_element-master.service";
import { ToastrService } from "ngx-toastr";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-employee-contributions',
  templateUrl: './employee-contributions.component.html',
  styleUrls: ['./employee-contributions.component.css']
})
export class EmployeeContributionsComponent implements OnInit {
  labelsData: any = '';
  employer_info_container_width: number;
  client_id: any;
  purchase_id: any;
  companyDetails: any;
  employeeContributionData: { plan_class_id: number; safe_harbor: string; employee_plan_contribution: string; premiums: string[]; created_at: string; created_by: string; updated_at: string; updated_by: string; };

  label: string;

  company: string;
  product: string;
  company_id: any;
  product_id: any;
  encodedId: string = null;
  id: number = null;

  section_id: any = 11;
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
    this.employer_info_container_width = 91;
	
    this.employeeContributionData = this.createNewEmployeeContribution();
    this.ElementLabelsList();
    this.getCompany();

    if (this.id) {
      this.getEmployeeContributionData();
    } else {
      this.toastrService.error("Valid plan class id is required");
      this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/plan-classes/plan-class']);
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


  createNewEmployeeContribution() {
    // Create a new Brand
    let employeeContribution = {
      plan_class_id: 0,
      safe_harbor: '',
      employee_plan_contribution: '',
      premiums: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: ''
    }
    return employeeContribution;
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

  resetPremiums() {
    this.employeeContributionData.premiums = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
  }

  public redirectToDashboard() {
    this.router.navigate(['client/' + this.product + '/' + this.globalService.encode(this.client_id) + '/dashboard']);
  }

  public redirectToPrevious() {
    this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/plan-classes/plan-class/' + this.encodedId +'/coverage-offered' ]);
  }

  /*getting data from service*/
  private getEmployeeContributionData() {

    this.planClassesService.getEmployeeContribution(this.id)
      .subscribe((employeeContributionInfo) => {

        if (employeeContributionInfo.employeeContribution) {

          this.employeeContributionData.safe_harbor = employeeContributionInfo.employeeContribution.safe_harbor;
          this.employeeContributionData.employee_plan_contribution = employeeContributionInfo.employeeContribution.employee_plan_contribution;
          let premiums = employeeContributionInfo.employeeContribution.empContributionPremiums;

          let MonthFields: any[] = [];
          if (premiums.length > 0) {
            premiums.forEach(eachSelectedMonth => {
              MonthFields[eachSelectedMonth.premium_month] = eachSelectedMonth.premium_value;
            });
            for (let i = 1; i <= 12; i++) {
              if (!MonthFields[i]) {
                MonthFields[i] = "";
              }
            }
          } else {
            MonthFields = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
          }
          this.employeeContributionData.premiums = MonthFields;
        }
      },
      error => { this._errorMessage = error.data }
      );
  }

  public onBlur(element) {
    if (element.target.value) {
      element.target.value = parseFloat(element.target.value).toFixed(2);
    }
  }
  /*on submit sending form data to service.It is for both add and update*/
  public onSubmit(param) {
    this.employeeContributionData['company_id']=this.company_id;
    this.planClassesService.createOrUpdateEmployeeContribution(this.id, this.employeeContributionData).subscribe(
      result => {
        if (result.success) {
          if (param == "exit") {
           this.redirectToDashboard();
          } else {
            this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/plan-classes']);
          }
        //  this.toastrService.success('Coverage Type Information record added succesfully.');
        } else {
          this._errorMessage = 'Not Added.';
        }
      },
      error => {
      });

  }
}
