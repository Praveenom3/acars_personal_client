import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
declare var $:any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
  }

  ngOnInit() {
    $("#companies").select2({
      tags: true
    })
  }

}
