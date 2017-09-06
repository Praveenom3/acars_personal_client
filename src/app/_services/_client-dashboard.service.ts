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
import { Company } from 'app/_models/company';
import { Products } from 'app/_models/products';
import { Brands } from 'app/_models/brands';
import { CompanyUserService } from 'app/_services/_company-user.service';

@Injectable()

export class ClientDashBoardService {

    public client_id: any;
    public dashBoard: boolean = false;

    vht: string = '';
    aca16: string = '';
    aca17: string = '';

    public rowsOnPage = 10;

    public product: Products;
    public client: any;
    public company: Company;
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

    public basicReportingLink: string;
    public benefitPlanLink: string;
    public planClassesLink: string;
    public payRollDataLink: string;
    public medicalPlanDataLink: string;
    public clientHomeUrl: string;
    public clientLogo: string = '';

    public selectedCompanyRow: any = '';

    logoPath: string = this._globalService.apiRoot + '/images/uploads/brands/';

    public brandInformation: any = {};

    public accountManager: string;
    public accountManagerNumber: string;

    public userRowsOnPage: number = 5;
    public uploadDataFileDate: any = '2017/10/15';
    // This is the URL to the OData end point
    private _apiUrl = this._globalService.apiHost + '/client-user';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _companyUserService: CompanyUserService,
        private _http: Http) {
    }
    /**
     * 
     */
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
            if (reversedUrl[2] != '') {
                clientId = this._globalService.decode(reversedUrl[1]);
                productId = this._globalService.decode(reversedUrl[2]);
            }

        } else {
            productId = this.productParams;
            clientId = this.clientParams
        }

        this.setDashBoardInfo(productId, clientId);
    }

    public getClientId(): any {
        let clientId;
        if (this.splitUrl) {
            let reversedUrl = this.splitUrl.split('/').reverse();
            clientId = this._globalService.decode(reversedUrl[1]);

        } else {
            clientId = this.clientParams
        }
        return clientId;
    }
    /**
     * 
     * @param productId 
     * @param clientId 
     * @param companyId 
     */
    public setDashBoardInfo(productId: any, clientId: any, companyId: any = 0) {
        this.client_id = "yes";
        let products = JSON.parse(localStorage.getItem('productsAndClients'));
        this.product = products[productId];
        this.clientHomeUrl = '/client/' + this._globalService.encode(productId) + '/' + this._globalService.encode(clientId) + '/dashboard';
        let userType: any = localStorage.getItem('usertype');
        if (this.product) {

            this.client = this.product['clients'][clientId]

            this.changeStyle();
            this.company = Object.assign({});
            if (userType == '3' && (this.client['primaryData'] == null || !this.client['primaryData'])) {
                this.redirectClientToWelcomeScreens();
            } else {
                this.dashBoard = true;

                if (userType == '3') {
                    let clientIds: any[] = Object.keys(this.product['clients']);
                    let data = {
                        "productId": productId,
                        "clients": clientIds,
                        "companyId": companyId
                    }
                    this.getClientCompanies(data).subscribe(
                        result => {
                            if (result.success) {

                                this.companies = result.data.companiesList;
                                this.rowsOnPage = this.companies.length;
                                this.company = result.data.defaultCompanyInformation;

                                this.selectedCompanyRow = this.company.company_id;
                                this.company.company_data = this.checkCompanyData(this.company);
                                this.userRowsOnPage = this.company.companyUsers.length;
                                this.setAccountManagerData(productId, clientId);
                                this.setCompanyUrls(productId, this.company.company_id);
                                this.setCompanyToSession()
                            }
                        },
                        error => {

                        });
                } else if (userType == 4) {

                    let data = {
                        "productId": productId,
                        "companyUserId": localStorage.getItem('user_id')
                    }
                    this._companyUserService.getCompanyUserCompanies(data).subscribe(
                        result => {
                            if (result.success) {

                                this.companies = result.data.companiesList;
                                this.rowsOnPage = this.companies.length;
                                this.company = result.data.defaultCompanyInformation;

                                this.selectedCompanyRow = this.company.company_id;
                                this.company.company_data = this.checkCompanyData(this.company);
                                this.userRowsOnPage = this.company.companyUsers.length;
                                this.setAccountManagerData(productId, clientId);
                                this.setCompanyUrls(productId, this.company.company_id);
                                this.setCompanyToSession()
                            }
                        },
                        error => {

                        });
                }

                this.primaryData = true;
            }
            this.getProductServiceName(this.product.product_type);
        }
    }
    /**
     * 
     * @param productId 
     * @param company_id 
     */
    public setCompanyUrls(productId, company_id) {

        let url: string = '/client/' + this._globalService.encode(productId) + '/' + this._globalService.encode(company_id);

        this.basicReportingLink = url + '/employer-info/basic-reporting-info';
        this.benefitPlanLink = url + '/employer-info/benefit-plan-info';
        this.planClassesLink = url + '/employer-info/plan-classes';
        this.payRollDataLink = url + '/employer-info/payroll';
        this.medicalPlanDataLink = url + '/employer-info/enrollments';
    }
    /**
     * 
     * @param productId 
     * @param clientId 
     */
    public setBrandData(productId, clientId, clientsCount = 0) {
        let product = this.getProductFieldFromSession(productId, 'clients');
        let client = product[clientId];
        let brand: any;
        let mobile: string;
        if (clientsCount > 1) {
            let brand = this.getProductFieldFromSession(productId, 'default_brand');
            mobile = brand.support_phone;
            this.brandInformation = {
                'brand_logo': brand.brand_logo,
                "support_email": brand.support_email,
                "support_phone": '(' + mobile.slice(0, 3) + ')' + mobile.slice(3, 6) + '-' + mobile.slice(6, 10)
            }
            this.clientLogo = this.logoPath + brand.brand_logo;
        } else {
            brand = client.brand;
            mobile = brand.support_phone;
            this.brandInformation = {
                'brand_logo': brand.brand_logo,
                "support_email": brand.support_email,
                "support_phone": '(' + mobile.slice(0, 3) + ')' + mobile.slice(3, 6) + '-' + mobile.slice(6, 10)
            }
            this.clientLogo = this.logoPath + brand.brand_logo;
        }
    }
    /**
     * 
     * @param company 
     */
    public setAccountManagerData(productId, clientId) {
        let clients = this.getProductFieldFromSession(productId, 'clients');
        let client = clients[clientId];
        if (client) {

            if (client['account_manager_name'] != 'null' && client['account_manager_name'] != '') {
                this.accountManager = client['account_manager_name'];
            }
            if (client['account_manager_number'] != 'null' && client['account_manager_number'] != '') {
                this.accountManagerNumber = client['account_manager_number'];
            }
        }
    }
    /**
     * 
     */
    public redirectClientToWelcomeScreens() {

        let defaultUrl: string;
        let navigateUrl: string;

        let clientId = this._globalService.encode(this.client['client_id']);
        let productId: any = this._globalService.encode(this.product.product_id)
        defaultUrl = '/client/' + productId + '/' + clientId + '/setup';

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
    /**
     * 
     * @param data 
     */
    public getClientCompanies(data) {
        return this._http.post(
            this._apiUrl + '/get-companies-of-clients', data,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    changeStyle() {

        this.vht = '';
        this.aca16 = '';
        this.aca17 = '';
        switch (this.product.applicable_year) {
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
        return this._http.post(
            this._apiUrl + '/save-client-primary-details', details,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json())
            .catch(this._globalService.handleError);
    }
    /**
     * 
     * @param company 
     */
    public setCompany(company: Company) {

        this.client = this.product['clients'][company.client_id]
        let userType = localStorage.getItem('usertype');
        this.changeStyle();
        this.dashBoard = false;
        if (userType == '3' && (this.client['primaryData'] == null || !this.client['primaryData'])) {
            this.redirectClientToWelcomeScreens();
        } else {
            this.dashBoard = true;
            this.company = company;
            this.company.company_data = this.checkCompanyData(this.company);
            this.userRowsOnPage = this.company.companyUsers.length;
            this.selectedCompanyRow = company.company_id;
            this.setCompanyUrls(this.product.product_id, this.company.company_id);
            this.setCompanyToSession()
        }
    }

    /**
     * 
     * @param company 
     */
    public checkCompanyData(company): boolean {
        if (!company.company_ein) {
            return false;
        }
        if (!company.basic_plan_information) {
            return false;
        }
        if (!company.benefitPlan_planClasses) {
            return false;
        }
        return true;
    }

    /**
     * 
     * @param productId 
     * @param field 
     */
    public getProductFieldFromSession(productId: number, field: any = null) {
        let products = JSON.parse(localStorage.getItem('productsAndClients'));
        let product = products[productId];
        if (product) {
            if (field) {
                return product[field];
            }
            return product;
        }
        return false;
    }

    /**
     * 
     * @param companyId 
     */
    public getCompanyInformation(companyId): Observable<any> {
        return this._http.get(
            this._apiUrl + '/get-company-information/' + companyId,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json())
            .catch(this._globalService.handleError);
    }
    /**
     * 
     */
    public setCompanyToSession() {
        let data: any = {
            'purchase_id': this.company.purchase_id,
            'client_id': this.company.client_id,
            'company_ein': this.company.company_ein,
            'company_name': this.company.company_name,
            'primary_data': this.company.primary_data,
            'onBoarding_data': this.company.onBoarding_data
        }

        localStorage.setItem('company', '');
        localStorage.setItem('company', JSON.stringify(data));
    }
    /**
     * 
     */
    public setCompanySteps() {
        this.company.company_data = this.checkCompanyData(this.company);
        this.company.onBoarding_data = this.checkOnBoardingData(this.company);
    }
    /**
     * 
     * @param company 
     */
    public checkOnBoardingData(company): boolean {

        if (!company.is_invoice_paid) {
            return false;
        }
        if (!company.client_agreement) {
            return false;
        }
        if (!company.discovery_session) {
            return false;
        }

        return true
    }
}


