import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
       $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
  }

}
