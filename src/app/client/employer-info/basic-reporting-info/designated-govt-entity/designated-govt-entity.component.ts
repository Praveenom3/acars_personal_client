import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-designated-govt-entity',
  templateUrl: './designated-govt-entity.component.html',
  styleUrls: ['./designated-govt-entity.component.css']
})
export class DesignatedGovtEntityComponent implements OnInit {
  model: any = {};
  company: string;
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
  }

}