import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-plan-classes',
  templateUrl: './plan-classes.component.html',
  styleUrls: ['./plan-classes.component.css']
})
export class PlanClassesComponent implements OnInit {
  company: string;
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
  }

}
