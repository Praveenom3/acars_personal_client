import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Globals from 'app/_shared/_globals';

declare var $:any;

@Component({
 selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', 
})
export class DashboardComponent implements OnInit {

  public hasFinancialRights:boolean = false;

  constructor() {}
  
  ngOnInit() {
    $('.table').dataTable({
      "paging":   false,
      "searching": true,
      "info":     false
    });

    for (var key in Globals.admin_permissions) {
      if (Globals.admin_permissions.hasOwnProperty(key)) {
        if(Globals.admin_permissions[key] == 'Financials'){
          let admin_permissions = JSON.parse(localStorage.getItem('admin_permissions'));
          admin_permissions.forEach(element => {
            if(element == key){
              this.hasFinancialRights = true;
            }
          });
        }
      }
    }
  }

}


@Component({
 selector: 'app-dashboard',
  templateUrl: './new-sales.component.html', 
})
export class NewSalesComponent implements OnInit {

  ngOnInit() {
       $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
    }
}



@Component({
 selector: 'app-dashboard',
  templateUrl: './processing.component.html', 
})
export class ProcessingComponent implements OnInit {

  ngOnInit() { $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
    }
}

@Component({
 selector: 'app-dashboard',
  templateUrl: './aca-forms.component.html', 
})
export class ACAFormsComponent implements OnInit {

  ngOnInit() { $('.table').dataTable({
            "paging":   false,
        "searching": false,
        "info":     false
        });
    }
}

