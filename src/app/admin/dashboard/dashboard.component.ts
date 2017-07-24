import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
 selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', 
})
export class DashboardComponent implements OnInit {
constructor(private toastrService: ToastrService) {}
  
  showSuccess() {
    this.toastrService.success('Hello world!');
  }

  showError() {
    this.toastrService.error('Some error found');
  }
  ngOnInit() {
        $('.table').dataTable({
            "paging":   false,
        "searching": true,
        "info":     false
        });
    this.showSuccess();
    }
}

@Component({
 selector: 'app-dashboard',
  templateUrl: './financials.component.html', 
})
export class FinancialsComponent implements OnInit {

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
  templateUrl: './admin-users.component.html', 
})
export class AdminUsersComponent implements OnInit {
 model: any = {};
  ngOnInit() { $('.table').dataTable({
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

