import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
     styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

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
