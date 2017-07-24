import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-general-plan-information',
  templateUrl: './general-plan-information.component.html',
  styleUrls: ['./general-plan-information.component.css']
})
export class GeneralPlanInformationComponent implements OnInit {
  company: string;
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
  }

}
