import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html'
})
export class PurchaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
  }

}
