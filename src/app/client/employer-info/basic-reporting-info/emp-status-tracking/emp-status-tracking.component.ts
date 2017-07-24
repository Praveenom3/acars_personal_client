import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-emp-status-tracking',
  templateUrl: './emp-status-tracking.component.html',
  styleUrls: ['./emp-status-tracking.component.css']
})
export class EmpStatusTrackingComponent implements OnInit {
  company: string;
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
  }

}