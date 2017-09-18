import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-vht-band',
  templateUrl: './vht-band.component.html',
  styleUrls: ['./vht-band.component.css']
})
export class VhtBandComponent implements OnInit {
  company: string;
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = 'vht';
    this.company = route.snapshot.params['company'];
  }
  ngOnInit() {
  }

}
