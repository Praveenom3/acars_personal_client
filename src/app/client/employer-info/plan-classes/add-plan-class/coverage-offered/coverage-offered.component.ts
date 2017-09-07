import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PlanClassesService } from "app/_services/_plan-classes.service";
import { ElementMasterService } from "app/_services/_element-master.service";
import { ToastrService } from "ngx-toastr";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-coverage-offered',
  templateUrl: './coverage-offered.component.html',
  styleUrls: ['./coverage-offered.component.css']
})
export class CoverageOfferedComponent implements OnInit {
  client_id: any;
  purchase_id: any;
  companyDetails: any;
  coverageOfferedData: { plan_class_id: number; employee_mv_coverage: any; entireMvYear: boolean; mv_coverage_months: any; employee_essential_coverage: any; entireMeYear: boolean; essential_coverage_months: any; spouse_essential_coverage: any; spouse_conditional_coverage: any; dependent_essential_coverage: any; created_at: string; created_by: string; updated_at: string; updated_by: string; };


  label: string;

  company: string;
  product: string;
  company_id: any;
  product_id: any;
  encodedId: string = null;
  id: number = null;
  public totalYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  section_id: any = 10;
  public labels: any[] = [];

  _errorMessage: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private globalService: GlobalService,
    private _elementMasterService: ElementMasterService,
    private planClassesService: PlanClassesService) {

    this.product_id = globalService.decode(route.snapshot.params['product']);
    this.company_id = globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];

    this.encodedId = route.snapshot.params['encodedId'];

    if (this.encodedId) {
      this.id = globalService.decode(route.snapshot.params['encodedId']);
    }

  }

  ngOnInit() {
    this.coverageOfferedData = this.createNewCoverageOffered();
    this.ElementLabelsList();
    this.getCompany();

    if (this.id) {
      this.getCoverageOfferedData();
    } else {
      this.toastrService.error("Valid plan class id is required");
      this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/plan-classes/plan-class']);
    }

  }

  getCompany() {
    let companyDet = this.globalService.getCompany();
    let products = JSON.parse(localStorage.getItem('productsAndClients'));
    let productYear = products[this.product_id]['applicable_year'];
    if (companyDet) {
      this.companyDetails = JSON.parse(companyDet);
      this.companyDetails.productYear = productYear;
      this.companyDetails['product'] = this.product;
      this.purchase_id = this.globalService.decode(this.companyDetails.purchase_id);
      this.client_id = this.globalService.decode(this.companyDetails.client_id);
    }
  }

  createNewCoverageOffered() {
    // Create a new coverageOffered
    let coverageOffered = {
      plan_class_id: 0,
      employee_mv_coverage: null,
      entireMvYear: false,
      mv_coverage_months: [],
      employee_essential_coverage: null,
      entireMeYear: false,
      essential_coverage_months: [],
      spouse_essential_coverage: null,
      spouse_conditional_coverage: null,
      dependent_essential_coverage: null,
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: ''
    }
    return coverageOffered;
  }

  /*getting data from service*/
  private getCoverageOfferedData() {
    let coverageOfferedInfo = this.route.snapshot.data['data'];

    if (coverageOfferedInfo.planClassCoverageTypeOffered) {
      this.coverageOfferedData = coverageOfferedInfo.planClassCoverageTypeOffered;

      if (this.coverageOfferedData.mv_coverage_months.length > 0) {
        this.coverageOfferedData.mv_coverage_months = JSON.parse(this.coverageOfferedData.mv_coverage_months);
        if (this.coverageOfferedData.mv_coverage_months.length == 12) {
          this.coverageOfferedData.entireMvYear = true;
          this.coverageOfferedData.mv_coverage_months = [];
        } else {
          let MvMonthFields: any[] = [];
          this.coverageOfferedData.mv_coverage_months.forEach((monthSelected, index) => {
            MvMonthFields[monthSelected] = true;
          });
          this.coverageOfferedData.mv_coverage_months = [];
          this.coverageOfferedData.mv_coverage_months = MvMonthFields;
        }
      }

      if (this.coverageOfferedData.essential_coverage_months.length > 0) {
        this.coverageOfferedData.essential_coverage_months = JSON.parse(this.coverageOfferedData.essential_coverage_months);
        if (this.coverageOfferedData.essential_coverage_months.length == 12) {
          this.coverageOfferedData.entireMeYear = true;
          this.coverageOfferedData.essential_coverage_months = [];
        } else {
          let MeMonthFields: any[] = [];
          this.coverageOfferedData.essential_coverage_months.forEach((monthSelected, index) => {
            MeMonthFields[monthSelected] = true;
          });
          this.coverageOfferedData.essential_coverage_months = [];
          this.coverageOfferedData.essential_coverage_months = MeMonthFields;
        }
      }

    } else {
      this.coverageOfferedData = this.createNewCoverageOffered();
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

  resetValues(type){
    if(type == 'employee_mv_coverage'){
      this.coverageOfferedData.entireMvYear= false;
      this.coverageOfferedData.mv_coverage_months= [];
    }else if(type == 'employee_essential_coverage'){
      this.coverageOfferedData.entireMeYear= false;
      this.coverageOfferedData.essential_coverage_months= [];
    }else if(type == 'spouse_essential_coverage'){
      this.coverageOfferedData.spouse_conditional_coverage= false;
    }
  }

  /*on submit sending form data to service.It is for both add and update*/
  public onSubmit(param) {
    let mv_customArray = [];
    if (this.coverageOfferedData.entireMvYear == true) {
      this.coverageOfferedData.mv_coverage_months = JSON.stringify(this.totalYear);
    } else {
      this.coverageOfferedData.mv_coverage_months.forEach((eachSelectedMonth, index) => {
        if (eachSelectedMonth == true) {
          mv_customArray.push(index);
        }
      });
      this.coverageOfferedData.mv_coverage_months = JSON.stringify(mv_customArray);
    }

    let me_customArray = [];
    if (this.coverageOfferedData.entireMeYear == true) {
      this.coverageOfferedData.essential_coverage_months = JSON.stringify(this.totalYear);
    } else {
      this.coverageOfferedData.essential_coverage_months.forEach((eachSelectedMonth, index) => {
        if (eachSelectedMonth == true) {
          me_customArray.push(index);
        }
      });
      this.coverageOfferedData.essential_coverage_months = JSON.stringify(me_customArray);
    }

    this.coverageOfferedData.plan_class_id = this.id;

    this.planClassesService.createOrUpdateCoverageOffered(this.id, this.coverageOfferedData).subscribe(
      result => {
        if (result.success) {
          if (param == "exit") {
            this.router.navigate(['client/' + this.product + '/' + this.company + '/dashboard']);
          } else {
            this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/plan-classes/plan-class/' + this.encodedId + '/employee-contributions']);
          }
          this.toastrService.success('Coverage Offered Information saved succesfully.');
        } else {
          this._errorMessage = 'Not Added.';
          this.toastrService.success('Trouble saving the record. Please try later.');
        }
      },
      error => {
      });
  }

}