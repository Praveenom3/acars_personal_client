import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-mec-coverage',
  templateUrl: './mec-coverage.component.html',
  styleUrls: ['./mec-coverage.component.css']
})
export class MecCoverageComponent implements OnInit {
  company: string;
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
  }

}