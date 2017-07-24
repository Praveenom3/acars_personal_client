import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html'
})
export class MasterDataComponent implements OnInit {


  constructor() { }

confirm() {
  if(confirm("Are you sure want to delete this record ?")) {
  //  console.log("Implement delete functionality here");
  }
}

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

@Component({
  selector: 'app-master-data',
  templateUrl: './add-brand.component.html'
})
export class AddBrandComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
        $('#masterdata_link').addClass('page-active');
    });
  }

}

@Component({
  selector: 'app-master-data',
  templateUrl: './edit-brand.component.html'
})
export class EditBrandComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
        $('#masterdata_link').addClass('page-active');
    });
  }

}