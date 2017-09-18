import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-vht-actions',
  templateUrl: './vht-actions.component.html',
  styleUrls: ['./vht-actions.component.css']
})
export class VhtActionsComponent implements OnInit {

company: string;
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = 'vht';
    this.company = route.snapshot.params['company'];
  }
  ngOnInit() {
  }

}
