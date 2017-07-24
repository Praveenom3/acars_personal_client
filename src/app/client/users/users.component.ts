import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

declare var $:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 model: any = {};
  company: string;
  product: string;
  constructor(route: ActivatedRoute) { 
    this.product = route.snapshot.params['product'];
    this.company = route.snapshot.params['company'];
  }

  ngOnInit() {
    $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
  }

}
