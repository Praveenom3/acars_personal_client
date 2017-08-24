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
import { ClientSetupDetails } from 'app/_models/client-setup-details';

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

    public clientAsDefaultBilling: boolean = false;
    public clientAsDefaultContractSign: boolean = false;
    public clientAsDefaultPrimaryContract: boolean = false;
    public clientAsDefaultAgreement: boolean = false;

    public billingStep: boolean = false;
    public contractSignStep: boolean = false;
    public primaryContractStep: boolean = false;
    public agreementStep: boolean = false;

    public isBillingContractSet: boolean = false;
    public isContractSignorSet: boolean = false;
    public isPrimaryContractSet: boolean = false;
    public isAgreementSet: boolean = false;


    public billingContractModel: ClientSetupDetails;
    public contractSignorModel: ClientSetupDetails;
    public primaryContractModel: ClientSetupDetails;
    public agreementModel: ClientSetupDetails;

    public primaryData: boolean = false;

    // This is the URL to the OData end point
    private _apiUrl = this._globalService.apiHost + '/client-user';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {
    }

    initDashBoardVaraibles() {

        this.clientAsDefaultBilling = false;
        this.clientAsDefaultContractSign = false;
        this.clientAsDefaultPrimaryContract = false;
        this.clientAsDefaultAgreement = false;

        this.billingStep = false;
        this.contractSignStep = false;
        this.primaryContractStep = false;
        this.agreementStep = false;

        this.isBillingContractSet = false;
        this.isContractSignorSet = false;
        this.isPrimaryContractSet = false;
        this.isAgreementSet = false;

        this.billingContractModel = this.createNewModel();
        this.contractSignorModel = this.createNewModel();
        this.primaryContractModel = this.createNewModel();
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
                if (this.isBillingContractSet) {

                    if (this.billingStep) {
                        navigateUrl = defaultUrl + '/' + 'billing-contract';
                    }
                    if (this.contractSignStep) {
                        navigateUrl = defaultUrl + '/' + 'contract-signor';
                    }

                    if (this.isContractSignorSet && this.primaryContractStep) {
                        navigateUrl = defaultUrl + '/' + 'primary-contract';
                    }
                    if (this.isPrimaryContractSet && this.agreementStep) {
                        navigateUrl = defaultUrl + '/' + 'agreement';
                    }
                }
                if (!navigateUrl) {
                    navigateUrl = defaultUrl;
                }
                this._router.navigate([navigateUrl]);
            }
            this.primaryData = true;
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

    /**
     * 
     */
    public validationMessages = {
        'first_name': {
            'required': 'First Name is required.',
            'minlength': 'First Name should be a minimum 3 chars.',
            'pattern': 'Please enter valid First Name',
        },
        'last_name': {
            'required': 'Last Name is required.',
            'minlength': 'Last Name should be a minimum 3 chars.',
            'pattern': 'Please enter valid Last Name',
        },
        'email_id': {
            'required': 'Email Address is required.',
            'pattern': 'Please enter valid Email Address',
        },
        'mobile_number': {
            'required': 'Mobile Number is required.'
        },
    };

    /**
     * 
     * @param form 
     * @param formErrors 
     * @param field 
     */
    public isValid(form, formErrors, field): boolean {

        let isValid: boolean = false;

        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if (form.controls[field].touched == false) {
            isValid = true;
        }

        // If the field is touched and valid value, then it is considered as valid.
        else if (form.controls[field].touched == true && form.controls[field].valid == true) {
            isValid = true;

        } else if (form.controls[field].touched == true && form.controls[field].valid == false) {
            let control = form.get(field);
            const messages = this.validationMessages[field];

            formErrors[field].valid = false;
            for (const key in control.errors) {
                formErrors[field].message = messages[key];
            }
            isValid = false;
        }
        return isValid;
    }
    /**
     * 
     */
    public createNewModel() {

        let model: ClientSetupDetails = {
            first_name: '',
            last_name: '',
            email_id: '',
            mobile_number: '',
            phone_extension: '',
        }
        return model;
    }
    /**
     * 
     * @param details 
     */
    public savePrimaryDetailsOfClient(details): Observable<any> {
        console.log(details);
        return this._http.post(
            this._apiUrl + '/save-client-primary-details', details,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json())
            .catch(this._globalService.handleError);
    }

}


