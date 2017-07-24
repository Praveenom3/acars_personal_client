import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
  }

}
