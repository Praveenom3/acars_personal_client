import { Component, OnInit } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

declare var $:any;

@Component({
  selector: 'app-form-pricing',
  templateUrl: './form-pricing.component.html',
  styleUrls: ['./form-pricing.component.css']
})
export class FormPricingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    $(document).ready(function(){
        $('#masterdata_link').addClass('page-active');
    });
  }

}
