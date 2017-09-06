import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PlanClassesService } from "app/_services/_plan-classes.service";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-plan-classes',
  templateUrl: './plan-classes.component.html',
  styleUrls: ['./plan-classes.component.css']
})
export class PlanClassesComponent implements OnInit {
  client_id: any;
  purchase_id: any;
  companyDetails: any;
  company_id: any;
  product_id: any;
  _errorMessage: any;
  planClasses: any;
  company: string;
  product: string;
  
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortOrder = "asc";
  public sortBy = "";

  constructor(
    route: ActivatedRoute,
    private globalService: GlobalService,
    private planClassesService: PlanClassesService) { 

    this.product_id = globalService.decode(route.snapshot.params['product']);
    this.company_id = globalService.decode(route.snapshot.params['company']);
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];

  }

  ngOnInit() {
    this.planClasses = this.getPlanClasses();
    this.getCompany();
  }

  getCompany() {
    let companyDet = this.globalService.getCompany();
    let products = JSON.parse(localStorage.getItem('productsAndClients'));
    let productYear = products[this.product_id]['applicable_year'];
    if (companyDet) {
      console.log(companyDet);
      this.companyDetails = JSON.parse(companyDet);
      this.companyDetails.productYear = productYear;
      this.companyDetails['product'] = this.product;
      this.companyDetails['clientEncodedId'] = this.globalService.encode(this.companyDetails.client_id);
      this.purchase_id = this.companyDetails.purchase_id;
      this.client_id = this.companyDetails.client_id;
    }
  }

  public getPlanClasses(){    
    this.planClassesService.getCompanyPlanClasses(this.company_id)
    .subscribe((planClasses) => {
      if(planClasses.planClassesInformation){
        this.planClasses = planClasses.planClassesInformation;
      }
    },
    error => { this._errorMessage = error.data }
    );
  }

  public getItemName(type, value){
    
    if(type == 'plan_type'){
      let object = [{"id":"1", "value":"No Plan"},{"id":"2", "value":"Self Insured"},{"id":"3", "value":"Fully Insured"},{"id":"4", "value":"Multi Employer"},{"id":"5", "value":"Combination"}];
      
      for (var key in object) {
        if(object[key].id == value){
          return object[key].value;
        }
      }
      
    }else if(type == 'waiting_period'){
      let object = [{"id":"1", "value":"Date of hire (DOH)"},{"id":"2", "value":"30 Days after DOH"},{"id":"3", "value":"60 Days after DOH"},{"id":"4", "value":"90 Days after DOH"},{"id":"5", "value":"1st of Month after DOH"},{"id":"6", "value":"1st of Month after 30 days after DOH"},{"id":"7", "value":"1st of Month after 60 days after DOH"},{"id":"8", "value":"1st of Month after 90 days after DOH"},{"id":"9", "value":"Combination"}];
      
      for (var key in object) {
        if(object[key].id == value){
          return object[key].value;
        }
      }
      
    }else if(type == 'months'){
      
      if(value){        
        let passed_months = JSON.parse(value);
        if(passed_months.length == 12){
          return 'Entire Year';
        }else{          
          let months_object = [{"id":"1", "month":"January"},{"id":"2", "month":"February"},{"id":"3", "month":"March"},{"id":"4", "month":"April"},{"id":"5", "month":"May"},{"id":"6", "month":"June"},{"id":"7", "month":"July"},{"id":"8", "month":"August"},{"id":"9", "month":"September"},{"id":"10", "month":"October"},{"id":"11", "month":"November"},{"id":"12", "month":"December"}];
          
          let Months_arr = [];
          for (var passed_key in passed_months) {
            for (var key in months_object) {
              if(months_object[key].id == passed_months[passed_key]){
                Months_arr.push(months_object[key].month);
              }
            }
          }
        
          return Months_arr.join();
        }
      }else{
        return '-';
      }
    }else if(type == 'MEC'){
      let MEC_arr = [];
      if(value.employee_essential_coverage && value.employee_essential_coverage==1){
        MEC_arr.push('Employee');
      }
      if(value.spouse_essential_coverage && value.spouse_essential_coverage==1){
        MEC_arr.push('Spouse');
      }
      if(value.dependent_essential_coverage && value.dependent_essential_coverage==1){
        MEC_arr.push('Dependent');
      }
      if(MEC_arr.length > 0){
        return MEC_arr.join();
      }else{
        return '-';
      }
    }
  }
}
