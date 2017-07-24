import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-element-master',
  templateUrl: './element-master.component.html',
  styleUrls: ['./element-master.component.css']
})
export class ElementMasterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
       $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
    $(document).ready(function(){
        $('#masterdata_link').addClass('page-active');
      });
  }

}
