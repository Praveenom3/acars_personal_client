import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ElementMasterService } from "app/_services/_element-master.service";
import { AnythingElse } from "app/_models/anything-else";
import { AnythingElseService } from "app/_services/_anything-else.service";

@Component({
  selector: 'app-anything-else',
  templateUrl: './anything-else.component.html',
  styleUrls: ['./anything-else.component.css']
})
export class AnythingElseComponent implements OnInit {

  customArray: any[] = [];
  anythingElseData: AnythingElse;
  label: string;
  company: string;
  product: string;

  section_id: any = 6;
  product_id: any;
  company_id: any;

  public labels: any[] = [];
  _errorMessage: any;

  constructor(route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private _anythingElseService: AnythingElseService,
    private _elementMasterService: ElementMasterService
  ) {
    this.product_id = this.product = route.snapshot.params['product'];
    this.company_id = this.company = route.snapshot.params['company'];

    /* let splittedProduct: any[] = [];
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
    this.anythingElseData = this.createNewAnythingElse();
    this.ElementLabelsList();
    this.getAnythingElseData();
  }

  handleChange(e) {
    if (e.target.checked == false) {
      this.anythingElseData.others = '';
    }
  }
  createNewAnythingElse() {
    // Create a new AnythingElse
    let newAnythingElse: AnythingElse = {
      additional_details_id: 0,
      company_id: 0,
      purchase_id: 0,
      hear_about_us: [],
      others: '',
      anything_else: '',
      created_at: '',
      created_by: '',
      updated_at: '',
      updated_by: ''
    }
    return newAnythingElse;
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

  /*getting labels from service*/
  private getAnythingElseData() {
    this._anythingElseService.getAnythingElseData(this.company_id)
      .subscribe((anythingData) => {
        if (anythingData) {
          this.anythingElseData = anythingData;
          this.anythingElseData.hear_about_us = JSON.parse(this.anythingElseData.hear_about_us);
          let hearAboutData: any[] = [];
          this.anythingElseData.hear_about_us.forEach((hearAboutElement, index) => {
            hearAboutData[hearAboutElement] = true;
          });
          this.anythingElseData.hear_about_us = [];
          this.anythingElseData.hear_about_us = hearAboutData;
        }
      },
      error => { this._errorMessage = error.data }
      );
  }

  private formSubmit(param) {
    this.customArray = [];
    this.anythingElseData.hear_about_us.forEach((hearAboutElement, index) => {
      if (hearAboutElement == true) {
        this.customArray.push(index);
      }
    });

    this.anythingElseData['purchase_id'] = this.product_id;
    this.anythingElseData['company_id'] = this.company_id;
    if (this.anythingElseData.additional_details_id > 0) {
      this.anythingElseData['hear_about_us'] = JSON.stringify(this.customArray);
      this._anythingElseService.updateAnythingElse(this.anythingElseData).subscribe(
        result => {
          if (result.success) {
            //this.getAnythingElseData();
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this.company]);
            } else {
              this.router.navigate(['client/' + this.product + '/' + this.company + '/' + 'employer-info/benefit-plan-info']);
            }
            this.toastrService.success('Basic Info record updated succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    }
    else {
      this.anythingElseData['hear_about_us'] = JSON.stringify(this.customArray);
      this._anythingElseService.addAnythingElse(this.anythingElseData).subscribe(
        result => {
          if (result.success) {
            // this.getAnythingElseData();
            if (param == "exit") {
              this.router.navigate(['client/' + this.product + '/' + this.company]);
            } else {
              this.router.navigate(['client/' + this.product + '/' + this.company + '/' + 'employer-info/benefit-plan-info']);
            }
            this.toastrService.success('Basic Info record added succesfully.');
          } else {
            this._errorMessage = 'Not Updated.';
          }
        },
        error => {
        });
    }
  }

}