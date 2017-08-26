import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ElementMasterService } from "app/_services/_element-master.service";
import { EmpStatusTracking } from "app/_models/emp-status-tracking";
import { ToastrService } from "ngx-toastr";
import { EmpStatusTrackingService } from "app/_services/_emp-status-tracking.service";

@Component({
  selector: 'app-emp-status-tracking',
  templateUrl: './emp-status-tracking.component.html',
  styleUrls: ['./emp-status-tracking.component.css']
})

export class EmpStatusTrackingComponent implements OnInit {

  empStatusData: EmpStatusTracking;
  _errorMessage: any;
  label: string;
  public labels: any[] = [];

  section_id: any = 2;
  product_id: any;
  company_id: any;

  company: string;
  product: string;
  constructor(route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private _empStatusTrackingService: EmpStatusTrackingService,
    private _elementMasterService: ElementMasterService
  ) {
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
    this.empStatusData = this.createNewEmpStatus();
    this.ElementLabelsList();
    this.getEmpStatusTrackingData();
  }

  createNewEmpStatus() {
    // Create a new BasicInfo
    let newEmpStatus: EmpStatusTracking = {
      emp_status_track_id: 0,
      company_id: 0,
      purchase_id: 0,
      ale_applicable: '',
      ale_first_applicable: '',
      ale_category: '',
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: '',
    }
    return newEmpStatus;
  }

  /*getting labels from service*/
  private getEmpStatusTrackingData() {
    this._empStatusTrackingService.getEmpStatusTrackingData(this.company_id)
      .subscribe((empstatusData) => {
        if (empstatusData) {
          this.empStatusData = empstatusData;
        }
      },
      error => { this._errorMessage = error.data }
      );
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

  private formSubmit(param) {
    this.empStatusData['purchase_id'] = this.product_id;
    this.empStatusData['company_id'] = this.company_id;
    if (this.empStatusData.emp_status_track_id > 0) {
      this._empStatusTrackingService.updateEmpStatusTracking(this.empStatusData).subscribe(
        result => {
          if (result.success) {
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this.company]);
            } else {
              this.router.navigate(['client/' + this.product + '/' + this.company + '/' + 'employer-info/basic-reporting-info/plan-offering-criteria']);
            }
            //this.getEmpStatusTrackingData();    
            this.toastrService.success('Employee status tracking record updated succesfully.');
          } else {
            this.toastrService.error('Error in update.');
          }
        },
        error => {
        });
    } else {
      this._empStatusTrackingService.addEmpStatusTracking(this.empStatusData).subscribe(
        result => {
          if (result.success) {
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this.company]);
            } else {
              this.router.navigate(['client/' + this.product + '/' + this.company + '/' + 'employer-info/basic-reporting-info/plan-offering-criteria']);
            }
            //this.getEmpStatusTrackingData();
            this.empStatusData = this.createNewEmpStatus();
            this.toastrService.success('Employee status tracking record added succesfully.');
          } else {
            this.toastrService.error('Error in adding.');
          }
        },
        error => {
        });
    }
  }


}