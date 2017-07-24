import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
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