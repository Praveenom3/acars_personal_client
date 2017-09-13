import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CustomToastrService } from "app/toaster/toaster-service";
import { ElementMasterService } from "app/_services/_element-master.service";
import { GovtEntity } from "app/_models/govt-entity";
import { DesignatedGovtEntityService } from "app/_services/_designated-govt-entity.service";
import { BriBasicInfoService } from "app/_services/_bri-basic-info.service";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-designated-govt-entity',
  templateUrl: './designated-govt-entity.component.html',
  styleUrls: ['./designated-govt-entity.component.css']
})

export class DesignatedGovtEntityComponent implements OnInit {
  isValidDgeEin: boolean = false;
  isValidDgePhone: boolean = false;
  client_id: any;
  purchase_id: any;
  companyDetails: any;
  states: any;
  govtEntityData: GovtEntity;
  model: any = {};
  company: string;
  product: string;
  _errorMessage: any;
  label: string;
  public labels: any[] = [];
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public ein_mask = [/[1-9]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  section_id: any = 4;
  product_id: any;
  company_id: any;

  constructor(private route: ActivatedRoute,
    private toastrService: CustomToastrService,
    private router: Router,
    private _designatedGovtEntity: DesignatedGovtEntityService,
    private _briBasicInfoService: BriBasicInfoService,
    private _globalService: GlobalService,
    private _elementMasterService: ElementMasterService) {
    this.product_id = _globalService.decode(route.snapshot.params['product']);
    this.company_id = _globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {

    this.ElementLabelsList();
    this.getStates();
    this.govtEntityData = this.createNewGovtEntity();
    this.getDesignatedGovtEntityData();
    this.getCompany();
  }

  createNewGovtEntity() {
    // Create a new BasicInfo
    let newGovtEntity: GovtEntity = {
      designated_govt_entity_id: 0,
      company_id: 0,
      purchase_id: 0,
      assign_dge: '',
      dge_name: '',
      dge_ein: '',
      street_address_1: '',
      street_address_2: '',
      dge_city: '',
      dge_state: '',
      dge_zip: '',
      dge_contact_first_name: '',
      dge_contact_middle_name: '',
      dge_contact_last_name: '',
      dge_contact_phone_number: '',
      dge_contact_suffix: '',
      dge_reporting: '',
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: '',
    }
    return newGovtEntity;
  }

  isValidMobile(mbl) {
    if (mbl) {
      let mblNumber = this._globalService.numberFilter(mbl);
      if (mblNumber.length < 10) {
        this.isValidDgePhone = true;
      } else {
        this.isValidDgePhone = false;
      }
    } else {
      this.isValidDgePhone = false;
    }
  }

  isValidEin(ein) {
    if (ein) {
      let einNumber = this._globalService.numberFilter(ein);
      if (einNumber.length < 8) {
        this.isValidDgeEin = true;
      } else {
        this.isValidDgeEin = false;
      }
    } else {
      this.isValidDgeEin = false;
    }
  }

  handleChange(value) {
    let assign_dge = this.govtEntityData.assign_dge;
    let designated_govt_entity_id = this.govtEntityData.designated_govt_entity_id;
    let created_at = this.govtEntityData.created_at;
    let created_by = this.govtEntityData.created_by;
    if (value != 1) {
      this.govtEntityData = this.createNewGovtEntity();
      this.govtEntityData.designated_govt_entity_id = designated_govt_entity_id;
      this.govtEntityData.assign_dge = assign_dge;
      this.govtEntityData.created_at = created_at;
      this.govtEntityData.created_by = created_by;
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
    let labelsData = this.route.snapshot.data['labels'];
    if (labelsData) {
      for (let label of labelsData) {
        this.label = label.element_serial_id + ' ' + label.element_label;
        this.labels.push(this.label);
      }
    }
  }

  // getStates
  private getStates() {
    this._briBasicInfoService.getStates()
      .subscribe((states) => {
        this.states = states;
      },
      error => { this._errorMessage = error.data }
      );
  }

  /*getting data from service*/
  private getDesignatedGovtEntityData() {
    let govtEntityData = this.route.snapshot.data['data'];
    if (govtEntityData) {
      this.govtEntityData = govtEntityData;
    }
  }

  public redirectToDashboard() {
    this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
  }

  public redirectToPrevious() {
    this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/basic-reporting-info/plan-offering-criteria']);
  }

  private formSubmit(param) {
    this.govtEntityData['purchase_id'] = this.purchase_id;
    this.govtEntityData['company_id'] = this.company_id;
    if (this.govtEntityData.designated_govt_entity_id > 0) {
      this._designatedGovtEntity.updateGovtEntity(this.govtEntityData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
            } else {
              this.router.navigate([url + '/' + 'employer-info/basic-reporting-info/aggregated-group']);
            }

            //this.getDesignatedGovtEntityData();
           // this.toastrService.success('Employee status tracking record added succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    } else {
      this._designatedGovtEntity.addGovtEntity(this.govtEntityData).subscribe(
        result => {
          // console.log(result.success);
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this._globalService.encode(this.client_id) + '/dashboard']);
            } else {
              this.router.navigate([url + '/' + 'employer-info/basic-reporting-info/aggregated-group']);
            }
            // this.getDesignatedGovtEntityData();
           // this.toastrService.success('Employee status tracking record added succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    }

  }

}