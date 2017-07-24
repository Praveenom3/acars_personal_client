import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
 model: any = {};
  constructor() { }

  ngOnInit() {
        $('.table').dataTable({
            "paging":   false,
        "searching": true,
        "info":     false
        });
    
    }

}
