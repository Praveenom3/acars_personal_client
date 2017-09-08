import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ElementMasterService } from "app/_services/_element-master.service";
import { MecCoverage } from "app/_models/mec-coverage";
import { MecCoverageService } from "app/_services/_mec-coverage.service";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-mec-coverage',
  templateUrl: './mec-coverage.component.html',
  styleUrls: ['./mec-coverage.component.css']
})
export class MecCoverageComponent implements OnInit {
  client_id: any;
  purchase_id: any;
  companyDetails: any;
  mecCoverageData: MecCoverage;

  _errorMessage: any;
  label: string;
  company: string;
  product: string;

  section_id: any = 8;
  product_id: any;
  company_id: any;
  public totalYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public labels: any[] = [];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private _mecService: MecCoverageService,
    private _globalService: GlobalService,
    private _elementMasterService: ElementMasterService) {
    this.product_id = _globalService.decode(route.snapshot.params['product']);
    this.company_id = _globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
    this.ElementLabelsList();
    this.mecCoverageData = this.createMecCoverage();
    this.getMecCoverageData();
    this.getCompany();
  }

  createMecCoverage() {
    // Create a new BasicInfo
    let newMecCoverage: MecCoverage = {
      mec_coverage_id: 0,
      company_id: 0,
      purchase_id: 0,
      mec_months: [],
      entireYear: '',
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: ''
    }
    return newMecCoverage;
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
    let labelsData = this.route.snapshot.data['labels'];
    if (labelsData) {
      for (let label of labelsData) {
        this.label = label.element_serial_id + ' ' + label.element_label;
        this.labels.push(this.label);
      }
    }
  }

  /*getting data from service*/
  private getMecCoverageData() {
    let mecData = this.route.snapshot.data['data'];
    if (mecData) {
      this.mecCoverageData = mecData;
      if (this.mecCoverageData.mec_months.length > 0) {
        this.mecCoverageData.mec_months = JSON.parse(this.mecCoverageData.mec_months);
        if (this.mecCoverageData.mec_months.length == 12) {
          this.mecCoverageData.entireYear = true;
          this.mecCoverageData.mec_months = [];
        } else {
          let MonthFields: any[] = [];
          this.mecCoverageData.mec_months.forEach((monthSelected, index) => {
            MonthFields[monthSelected] = true;
          });
          this.mecCoverageData.mec_months = [];
          this.mecCoverageData.mec_months = MonthFields;
        }
      }
    }
  }

  public redirectToDashboard() {
    this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
  }

  private formSubmit(param) {
    this.mecCoverageData['purchase_id'] = this.product_id;
    this.mecCoverageData['company_id'] = this.company_id;
    let customArray = [];
    if (this.mecCoverageData.entireYear == true) {
      this.mecCoverageData.mec_months = JSON.stringify(this.totalYear);
    } else {
      this.mecCoverageData.mec_months.forEach((eachSelectedMonth, index) => {
        if (eachSelectedMonth == true) {
          customArray.push(index);
        }
      });
      this.mecCoverageData.mec_months = JSON.stringify(customArray);
    }

    if (this.mecCoverageData.mec_coverage_id > 0) {
      this._mecService.updateMecCoverage(this.mecCoverageData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.redirectToDashboard();
            } else {
              this.router.navigate([url + '/' + 'employer-info/plan-classes']);
            }
            this.getMecCoverageData();
            this.mecCoverageData = this.createMecCoverage();
            this.toastrService.success('MEC Coverage record updated succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    } else {
      this._mecService.addMecCoverage(this.mecCoverageData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.redirectToDashboard();
            } else {
              this.router.navigate([url + '/' + 'employer-info/plan-classes']);
            }
            this.getMecCoverageData();
            this.mecCoverageData = this.createMecCoverage();
            this.toastrService.success('MEC Coverage record added succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    }
  }

}