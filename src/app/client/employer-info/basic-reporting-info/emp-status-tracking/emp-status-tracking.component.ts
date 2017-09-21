import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ElementMasterService } from "app/_services/_element-master.service";
import { EmpStatusTracking } from "app/_models/emp-status-tracking";
import { ToastrService } from "ngx-toastr";
import { EmpStatusTrackingService } from "app/_services/_emp-status-tracking.service";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-emp-status-tracking',
  templateUrl: './emp-status-tracking.component.html',
  styleUrls: ['./emp-status-tracking.component.css']
})

export class EmpStatusTrackingComponent implements OnInit {
  client_id: any;
  purchase_id: any;
  companyDetails: any;

  empStatusData: EmpStatusTracking;
  _errorMessage: any;
  label: string;
  public labels: any[] = [];

  section_id: any = 2;
  product_id: any;
  company_id: any;

  company: string;
  product: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private _empStatusTrackingService: EmpStatusTrackingService,
    private _globalService: GlobalService,
    private _elementMasterService: ElementMasterService
  ) {
    this.product_id = _globalService.decode(route.snapshot.params['product']);
    this.company_id = _globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
    this.empStatusData = this.createNewEmpStatus();
    let labelsData = this.route.snapshot.data['labels'];
    let empStatusData = this.route.snapshot.data['data'];
    if (labelsData) {
      for (let label of labelsData.labels) {
        this.label = label.element_serial_id + ' ' + label.element_label;
        this.labels.push(this.label);
      }
    }
    if (empStatusData) {
      this.empStatusData = empStatusData;
    }
    this.getCompany();
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

  public redirectToDashboard() {
    this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
  }

  public redirectToPrevious() {
    this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/basic-reporting-info']);
  }

  private formSubmit(param) {
    this.empStatusData['purchase_id'] = this.purchase_id;
    this.empStatusData['company_id'] = this.company_id;
    if (this.empStatusData.emp_status_track_id > 0) {
      this._empStatusTrackingService.updateEmpStatusTracking(this.empStatusData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
            } else {
              this.router.navigate([url + '/' + 'employer-info/basic-reporting-info/plan-offering-criteria']);
            }
            //this.getEmpStatusTrackingData();    
            // this.toastrService.success('Employee status tracking record updated succesfully.');
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
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
            } else {
              this.router.navigate([url + '/' + 'employer-info/basic-reporting-info/plan-offering-criteria']);
            }
            //this.getEmpStatusTrackingData();
            // this.toastrService.success('Employee status tracking record added succesfully.');
          } else {
            this.toastrService.error('Error in adding.');
          }
        },
        error => {
        });
    }
  }


}