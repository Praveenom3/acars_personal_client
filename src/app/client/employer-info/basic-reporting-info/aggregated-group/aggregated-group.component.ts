import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ElementMasterService } from "app/_services/_element-master.service";
import { AggregatedGroup } from "app/_models/aggregated-group";
import { AggregatedGroupService } from "app/_services/_aggregated-group.service";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-aggregated-group',
  templateUrl: './aggregated-group.component.html',
  styleUrls: ['./aggregated-group.component.css']
})
export class AggregatedGroupComponent implements OnInit {
  purchase_id: any;
  client_id: any;
  companyDetails: any;
  groupListsData: any;
  lengb: number;
  aggregatedGroupData: AggregatedGroup;
  company: string;
  product: string;

  label: string;
  section_id: any = 5;
  product_id: any;
  company_id: any;
  public ein_mask = [/[1-9]/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]

  public labels: any[] = [];
  _errorMessage: any;
  inputs = [{ name: "", ein: "" }];

  public totalYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    public globalService: GlobalService,
    private _aggregateGroupService: AggregatedGroupService,
    private _elementMasterService: ElementMasterService) {
    this.product_id = globalService.decode(route.snapshot.params['product']);
    this.company_id = globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
    this.lengb = this.inputs.length;
    this.ElementLabelsList();
    this.aggregatedGroupData = this.createNewAggregatedGroup();
    this.getAggregatedGroupData();
    this.getCompany();
  }

  handleChange(value) {
    let aggregated_group_id = this.aggregatedGroupData.aggregated_group_id;
    let is_authoritative_transmittal = this.aggregatedGroupData.is_authoritative_transmittal;
    let is_ale_member = this.aggregatedGroupData.is_ale_member;
    let created_at = this.aggregatedGroupData.created_at;
    let created_by = this.aggregatedGroupData.created_by;
    if (value != 1) {
      this.aggregatedGroupData = this.createNewAggregatedGroup();
      this.aggregatedGroupData.is_authoritative_transmittal = is_authoritative_transmittal;
      this.aggregatedGroupData.aggregated_group_id = aggregated_group_id;
      this.aggregatedGroupData.is_ale_member = is_ale_member;
      this.aggregatedGroupData.created_at = created_at;
      this.aggregatedGroupData.created_by = created_by;
      this.inputs = [{ name: "", ein: "" }];
      this.lengb = this.inputs.length;
    }
  }

  isOtherEntityChange(value) {
    if (value != 1) {
      this.aggregatedGroupData.total_1095_forms = '';
    }
  }

  addInput() {
    this.inputs.push({ name: '', ein: '' });
    this.lengb = this.inputs.length;
  }

  remove(input) {
    this.inputs.splice(input, 1);
    this.lengb = this.inputs.length;
  }

  createNewAggregatedGroup() {
    // Create a new BasicInfo
    let newAggregatedGroup: AggregatedGroup = {
      aggregated_group_id: 0,
      company_id: 0,
      purchase_id: 0,
      is_authoritative_transmittal: '',
      is_ale_member: '',
      is_other_entity: '',
      total_1095_forms: '',
      total_aggregated_grp_months: [],
      group_list: [],
      entireYear: '',
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: ''
    }
    return newAggregatedGroup;
  }

  /*GET COMPANY DETAILS AND PRODUCT YEAR*/
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

  /*getting labels from service*/
  private ElementLabelsList() {
    let labelsData = this.route.snapshot.data['labels'];
    if (labelsData) {
      for (let label of labelsData.labels) {
        this.label = label.element_serial_id + ' ' + label.element_label;
        this.labels.push(this.label);
      }
    }
  }

  public isEntireYear(val) {
    if (val == true) {
      let totalYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      let MonthFields: any[] = [];
      totalYear.forEach((monthSelected, index) => {
        MonthFields[monthSelected] = true;
      });
      this.aggregatedGroupData.total_aggregated_grp_months = [];
      this.aggregatedGroupData.total_aggregated_grp_months = MonthFields;
    }
    else {
      this.aggregatedGroupData.total_aggregated_grp_months = [];
    }
  }

  public getMonthsCount() {
    let customArray = [];
    if (this.aggregatedGroupData.total_aggregated_grp_months.length > 0) {
      this.aggregatedGroupData.total_aggregated_grp_months.forEach((eachSelectedMonth, index) => {
        if (eachSelectedMonth == true) {
          customArray.push(index);
        }
      });
    }
    if (customArray.length == 12) {
      this.aggregatedGroupData.entireYear = true;
    } else {
      this.aggregatedGroupData.entireYear = false;
    }
  }


  /*getting data from service*/
  private getAggregatedGroupData() {
    let planOfferData = this.route.snapshot.data['data'];
    let MonthFields: any[] = [];
    if (planOfferData) {
      this.aggregatedGroupData = planOfferData;
      if (planOfferData.briAggregatedGroupLists.length != 0) {
        this.inputs = [];
        this.groupListsData = planOfferData.briAggregatedGroupLists;
        for (let tempData of this.groupListsData) {
          this.inputs.push({ name: tempData.group_name, ein: tempData.group_ein });
          this.lengb = this.inputs.length;
        }
      }

      if (this.aggregatedGroupData.total_aggregated_grp_months) {
        this.aggregatedGroupData.total_aggregated_grp_months = JSON.parse(this.aggregatedGroupData.total_aggregated_grp_months);
        if (this.aggregatedGroupData.total_aggregated_grp_months.length == 12) {
          this.aggregatedGroupData.entireYear = true;
          this.aggregatedGroupData.total_aggregated_grp_months.forEach((monthSelected, index) => {
            MonthFields[monthSelected] = true;
          });
          this.aggregatedGroupData.total_aggregated_grp_months = [];
          this.aggregatedGroupData.total_aggregated_grp_months = MonthFields;
        } else {
          this.aggregatedGroupData.total_aggregated_grp_months.forEach((monthSelected, index) => {
            MonthFields[monthSelected] = true;
          });
          this.aggregatedGroupData.total_aggregated_grp_months = [];
          this.aggregatedGroupData.total_aggregated_grp_months = MonthFields;
        }
      }

    }
  }

  public redirectToDashboard() {
    this.router.navigate(['client/' + this.product + '/' + this.globalService.encode(this.client_id) + '/dashboard']);
  }

  public redirectToPrevious() {
    this.router.navigate(['client/' + this.product + '/' + this.company + '/employer-info/basic-reporting-info/designated-govt-entity']);
  }

  private formSubmit(param) {
    this.aggregatedGroupData['purchase_id'] = this.purchase_id;
    this.aggregatedGroupData['company_id'] = this.company_id;
    let customArray = [];
    if (this.aggregatedGroupData.entireYear == true) {
      //this.aggregatedGroupData.total_aggregated_grp_months = JSON.stringify(this.totalYear);
    } else {
      this.aggregatedGroupData.total_aggregated_grp_months.forEach((eachSelectedMonth, index) => {
        if (eachSelectedMonth == true) {
          customArray.push(index);
        }
      });
      //this.aggregatedGroupData.total_aggregated_grp_months = JSON.stringify(customArray);
    }

    this.aggregatedGroupData.group_list = this.inputs;
    if (this.aggregatedGroupData.aggregated_group_id > 0) {
      this._aggregateGroupService.updateAggregatedGroup(this.aggregatedGroupData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this.globalService.encode(this.client_id) + '/dashboard']);
            } else {
              this.router.navigate([url + '/' + 'employer-info/basic-reporting-info/anything-else']);
            }

            // this.getAggregatedGroupData();
            //this.aggregatedGroupData = this.createNewAggregatedGroup();
           // this.toastrService.success('Basic Info record added succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    } else {
      this._aggregateGroupService.addAggregatedGroup(this.aggregatedGroupData).subscribe(
        result => {
          if (result.success) {
            let url: string = 'client/' + this.product + '/' + this.company;
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this.globalService.encode(this.client_id) + '/dashboard']);
            } else {
              this.router.navigate([url + '/' + 'employer-info/basic-reporting-info/anything-else']);
            }
            //this.getAggregatedGroupData();
            //this.aggregatedGroupData = this.createNewAggregatedGroup();
           // this.toastrService.success('Basic Info record added succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    }
  }

}