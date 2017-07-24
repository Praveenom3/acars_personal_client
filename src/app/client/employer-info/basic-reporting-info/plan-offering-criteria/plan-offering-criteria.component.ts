import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-plan-offering-criteria',
  templateUrl: './plan-offering-criteria.component.html',
  styleUrls: ['./plan-offering-criteria.component.css']
})
export class PlanOfferingCriteriaComponent implements OnInit {
  company: string;
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
  }

}