import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

   public company: string;
  public product: string;

 constructor(route: ActivatedRoute) {    
   this.product = 'vht';
    this.company = route.snapshot.params['company'];
  }


  ngOnInit() {
  }

}
