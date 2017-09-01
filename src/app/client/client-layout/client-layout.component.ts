import { Component, OnInit } from '@angular/core';
import { IdleTimeoutService } from "app/_services/_idle-timeout.service";
import { RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from "../../login/login.component";
import { Router, ActivatedRoute } from "@angular/router";
import { CompaniesComponent } from "../../client/companies/companies.component";
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
})
export class ClientLayoutComponent implements OnInit {

  public productsData: any[] = [];

  public vhtStatus: boolean = false;
  public aca16Status: boolean = false;
  public aca17Status: boolean = false;

  public userFirstName: string;
  public userLastName: string;

  constructor(private router: Router,
    route: ActivatedRoute,
    private _idleTimeout: IdleTimeoutService,
    public dashBoardService: ClientDashBoardService,
    private _globalService: GlobalService,
  ) {

    _idleTimeout.init();
    this.dashBoardService.initDashBoardVaraibles();
    this.userFirstName = localStorage.getItem('firstName');
    this.userFirstName = (this.userFirstName === 'undefined') ? '' : this.userFirstName;
    this.userLastName = localStorage.getItem('lastName');
    this.userLastName = (this.userLastName != 'undefined') ? this.userLastName : '';
  }

  ngOnInit() {
    this.displayClientProducts();
  }

  setInformation(url = '') {
    this.dashBoardService.initDashBoardVaraibles();
    this.dashBoardService.splitUrl = url;
    this.dashBoardService.setInformation()
  }

  displayClientProducts() {

    let products = JSON.parse(localStorage.getItem('productsAndClients'));
    let clientObject: ClientLayoutComponent = this;

    let productsList = Object.keys(products).map(function (key) {
      return products[key]
    })
    let maxYear = 0;
    let selectedProduct;

    productsList.forEach(element => {
      let currentValue = element.applicable_year;
      if (currentValue > maxYear) {
        maxYear = currentValue;
      }
      let productInfo = {};

      let clientKeys: any[] = Object.keys(element.clients);
      let clientId: number = element['clients'][clientKeys[0]]['client_id'];
      let productUrl: string = '/client/' + this._globalService.encode(element.product_id) +
        '/' + this._globalService.encode(clientId) + '/dashboard';

      let productName: string = element.product_name.toLocaleLowerCase();

      if (productName == 'vht') {

        productInfo['className'] = 'vht';
        productInfo['productName'] = 'Variable Hour Tracking';
        this.vhtStatus = true;
        this.productsData['vht'] = '/client/vht';

      } else {

        switch (currentValue) {
          case '2016':
            productInfo['className'] = 'aca16';
            productInfo['productName'] = '2016 ACA Reporting';
            this.aca16Status = true
            this.productsData['aca16'] = productUrl;
            break;
          case '2017':
            productInfo['className'] = 'aca17';
            productInfo['productName'] = '2017 ACA Reporting';
            this.productsData['aca17'] = productUrl;
            this.aca17Status = true
            break;
        }
      }
    });
  }
}
