import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit {

  constructor() { }

   ngOnInit() {
        $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
    }
}
