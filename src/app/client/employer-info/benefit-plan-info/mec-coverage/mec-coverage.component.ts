import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ElementMasterService } from "app/_services/_element-master.service";
import { MecCoverage } from "app/_models/mec-coverage";
import { MecCoverageService } from "app/_services/_mec-coverage.service";

@Component({
  selector: 'app-mec-coverage',
  templateUrl: './mec-coverage.component.html',
  styleUrls: ['./mec-coverage.component.css']
})
export class MecCoverageComponent implements OnInit {
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
  constructor(route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private _mecService: MecCoverageService,
    private _elementMasterService: ElementMasterService) {
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];

    let splittedProduct: any[] = [];
    let splittedCompany: any[] = [];

    if (this.product) {
      splittedProduct = this.product.split("-");
      this.product_id = splittedProduct[0];
    }

    if (this.company) {
      splittedCompany = this.company.split("-");
      this.company_id = splittedCompany[0];
    }

  }

  ngOnInit() {
    this.ElementLabelsList();
    this.mecCoverageData = this.createMecCoverage();
    this.getMecCoverageData();
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
  private getMecCoverageData() {
    this._mecService.getMecCoverageData(this.company_id)
      .subscribe((mecData) => {
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
      },
      error => { this._errorMessage = error.data }
      );
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