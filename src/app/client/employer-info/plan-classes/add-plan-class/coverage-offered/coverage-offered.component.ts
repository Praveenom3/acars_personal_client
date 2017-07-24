import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-coverage-offered',
  templateUrl: './coverage-offered.component.html',
  styleUrls: ['./coverage-offered.component.css']
})
export class CoverageOfferedComponent implements OnInit {
  company: string;
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
  }

}