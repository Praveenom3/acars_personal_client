import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-error-master',
  templateUrl: './error-master.component.html',
  styleUrls: ['./error-master.component.css']
})
export class ErrorMasterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
  }

}
