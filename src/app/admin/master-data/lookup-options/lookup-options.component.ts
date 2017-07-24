import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-master-data',
  templateUrl: './lookup-options.component.html',
   styleUrls: ['./lookup-options.component.css']
})
export class LookupOptionsComponent implements OnInit {


public dropdownActive = true;
public textboxActive = false;

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


  public addOption(){
    this.dropdownActive = false;
    this.textboxActive = true;
  }

  public saveOption(){
    this.dropdownActive = true;
    this.textboxActive = false;
  }

  public cancelOption(){
     this.dropdownActive = true;
    this.textboxActive = false;
  }

}
