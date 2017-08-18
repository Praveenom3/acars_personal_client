import { Component, OnInit } from '@angular/core';
import { IdleTimeoutService } from "app/_services/_idle-timeout.service";
import {RouterStateSnapshot} from '@angular/router';
@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
})
export class ClientLayoutComponent implements OnInit {

  vht: string = '';
  aca16: string = '';
  aca17: string = '';

  public aca16Status: boolean = false;
  public aca17Status: boolean = false;
  public vhtStatus: boolean = false;

  constructor(private _idleTimeout: IdleTimeoutService) {
    _idleTimeout.init();
    this._setClientProducts();
  }

  ngOnInit() {
  }

  changeStyle(arg) {

      this.vht = '';
      this.aca16 = '';
      this.aca17 = '';
      switch(arg){
        case 'aca16' :
          this.aca16 = 'active';
          break;
        case 'aca17' :
          this.aca17 = 'active';
          break;
        case 'vht' :
          this.vht = 'active';
          break;
      }
  }
  /**
   *  Setting product status to diplay the products in the view page
   */
  private _setClientProducts() {
    let data = JSON.parse(localStorage.getItem('clientsAndCompanies'));
    let products:any[] = Object.keys(data);
    let clientObject:ClientLayoutComponent = this;
    products.forEach(function (currentValue) {
      switch (currentValue) {
        case '1':
          clientObject.aca16Status = true;
          break;
        case '2':
          clientObject.aca17Status = true;
          break;
        case '3':
          clientObject.vhtStatus = true;
          break;
      }
    });
  }
}
