import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

   public company: string;
  public product: string;

 constructor(route: ActivatedRoute) {    
   this.product = 'vht';
    this.company = route.snapshot.params['company'];
  }



  ngOnInit() {
  }

}
