import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-code-calculator',
  templateUrl: './code-calculator.component.html',
  styleUrls: ['./code-calculator.component.css']
})
export class CodeCalculatorComponent implements OnInit {

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
@Component({
  selector: 'app-code-calculator',
  templateUrl: './add-code-calculator.component.html'
})
export class AddCodeCalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
@Component({
  selector: 'app-code-calculator',
  templateUrl: './edit-code-calculator.component.html'
})
export class EditCodeCalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}