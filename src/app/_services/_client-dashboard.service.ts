import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router, ActivatedRoute } from "@angular/router";
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

import { AdminUser } from "app/_models/admin-user";
import { GlobalService } from './_global.service';


@Injectable()

export class ClientDashBoardService {

    vht: string = '';
    aca16: string = '';
    aca17: string = '';

    public product: any;
    public client: any;
    public company: any;
    public companies: any;
    public productService: string;

    public productParams;
    public clientParams;

    public splitUrl: string = '';

    public contractSignUrl: string;

    public clientAsDefaultBilling: boolean = false;

    public isBillingContractSet: boolean = false;
    public isContractSignorSet: boolean = false;
    public isPrimaryContractSet: boolean = false;
    public isAgreementSet: boolean = false;

    public contractSignorBackTriggerd: boolean = false;

    // This is the URL to the OData end point
    private _apiUrl = this._globalService.apiHost + '/client-user';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {
    }
    /**
      * Setting Client information used in dash board for displaying clients and companies
      */
    public setInformation() {
        let productId;
        let clientId;

        if (this.splitUrl) {
            let reversedUrl = this.splitUrl.split('/').reverse();
            productId = reversedUrl[1].split('-');
            clientId = reversedUrl[2].split('-');

        } else {
            if (this.productParams) {
                productId = this.productParams.split('-');
            }
            if (this.clientParams) {
                clientId = this.clientParams.split('-');// getting client from url
            }
        }

        if (typeof productId[0] != 'undefined') {
            productId = productId[0]
        }

        if (typeof clientId[0] != 'undefined') {
            clientId = clientId[0]
        }
        this.setInfo(productId, clientId);
    }


    /**
     * 
     * @param productId 
     * @param clientId 
     * @param companyId 
     */
    public setInfo(productId: any, clientId: any, companyId: any = 0) {

        let products = JSON.parse(localStorage.getItem('clientsAndCompanies'));
        this.product = products[productId];
        if (this.product) {
            this.client = this.product['clients'][clientId]
            let clientName: string = this.client['client_name'];
            clientName = clientName.toLocaleLowerCase().replace(/\s+/g, "-");
            let productName: string = this.product.productName.toLocaleLowerCase().replace(/\s+/g, "-");
            let userType = localStorage.getItem('usertype');
            this.changeStyle();
            if (userType == '3' && (this.client['primaryData']) == null) {
                let defaultUrl: string;
                let navigateUrl: string;
                defaultUrl = '/client/' + clientId + '-' + clientName + '/' + this.product.productId + '-' + productName + '-' + this.product.applicableYear + '/setup';
                console.log(this.contractSignorBackTriggerd)
                if (this.isBillingContractSet) {
                    navigateUrl = defaultUrl + '/' + 'contract-signor';
                    if (this.contractSignorBackTriggerd == true) {
                        this.contractSignorBackTriggerd = false;
                        navigateUrl = defaultUrl + '/' + 'billing-contract';
                    }
                }
                if (!navigateUrl) {
                    navigateUrl = defaultUrl;
                }
                this._router.navigate([navigateUrl]);
            }

            this.companies = this.client.companies;
            let companyKeys: any[] = Object.keys(this.companies);
            this.company = this.companies[companyKeys[0]];
            this.getProductServiceName(this.product.productType);
        }
    }

    changeStyle() {

        this.vht = '';
        this.aca16 = '';
        this.aca17 = '';
        switch (this.product.applicableYear) {
            case '2016':
                this.aca16 = 'active';
                break;
            case '2017':
                this.aca17 = 'active';
                break;
            case 'vht':
                this.vht = 'active';
                break;
        }
    }

    /**
   * Assigns product Service name based on the product type
   * 
   * @param productType 
   */
    public getProductServiceName(productType) {

        this._globalService.productTypes.forEach(element => {
            if (element.id == productType) {
                this.productService = element.service;
            }
        });
    }
}


