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
import { ToastrService } from "ngx-toastr";
import { HttpService } from "app/interceptors/http.service";
import { Location } from '@angular/common';

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
    public uploadFilesLink: string;
    public documentsHistoryLink: string;
    public medicalPlanDataLink: string;
    public clientHomeUrl: string;
    public clientLogo: string = '';
    public termsLink: string = '';
    public selectedCompanyRow: any = '';

    logoPath: string = this._globalService.apiRoot + '/images/uploads/brands/';

    public brandInformation: any = {};

    public accountManager: string;
    public accountManagerNumber: string;
    public accountManagerMail: string;

    public userRowsOnPage: number = 5;

    // This is the URL to the OData end point
    private _apiUrl = this._globalService.apiHost + '/client-user';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private toastrService: ToastrService,
        private _companyUserService: CompanyUserService,
        private _http: HttpService,
        private location: Location,
        private _httpService: HttpService) {
    }
    /**
     * 
     */
    initDashBoardVaraibles() {

        this.dashBoard = false;
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
            this.splitUrl = '';
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
    setHomeUrl(productId, clientId) {
        this.clientHomeUrl = '/client/' + this._globalService.encode(productId) + '/' + this._globalService.encode(clientId) + '/dashboard';
    }


    /**
     * 
     * @param productId 
     * @param clientId 
     * @param companyId 
     */
    public setDashBoardInfo(productId: any, clientId: any, companyId: any = 0) {
        this.client_id = "yes";
        let products = this._globalService.getProducts();
        this.product = products[productId];
        this.setHomeUrl(productId, clientId);
        let userType: any = localStorage.getItem('usertype');
        if (this.product) {

            this.client = this.product['clients'][clientId]
            this.setBrandData();
            this.changeStyle();
            this.company = Object.assign({});
            if ((userType != '4') && (this.client['primaryData'] == null || !this.client['primaryData'])) {
                this.redirectClientToWelcomeScreens();
            } else {
                this.dashBoard = true;

                if (userType != 4) {
                    let productYear = this.product.applicable_year;

                    let products = this._globalService.getProducts();
                    let productsList = Object.keys(products).map(function (key) {
                        return products[key]
                    })

                    let productIds: any[];
                    let clientUsers: any = [];
                    let companyUsersList: any = [];
                    productsList.forEach(element => {
                        if (element.applicable_year == productYear && element.product_name.toLowerCase() != 'vht') {
                            let clients: any[] = element['clients'];
                            let clientsList = Object.keys(clients).map(function (key) {
                                return clients[key]
                            })
                            clientsList.forEach(clientElement => {
                                let productinfo: any = {
                                    'productId': element.product_id,
                                    'clientId': clientElement.client_id
                                };
                                if (clientElement.companyUser) {
                                    companyUsersList.push(productinfo);
                                } else {
                                    clientUsers.push(productinfo);
                                }
                            });
                        }
                    });

                    let data = {
                        "clientUsersList": clientUsers,
                        "companyUsersList": companyUsersList,
                    }

                    this.getClientCompanies(data).subscribe(
                        result => {
                            if (result.success) {

                                this.companies = result.data.companiesList;
                                this.rowsOnPage = this.companies.length;
                                let companyStatus = true;
                                let sessionCompanyData = JSON.parse(this._globalService.getCompany());
                                if (sessionCompanyData && sessionCompanyData != null && typeof sessionCompanyData != 'undefined') {
                                    let sessionCompanyId = this._globalService.decode(sessionCompanyData.company_id);
                                    let selectedCompany: Company;
                                    this.companies.forEach(element => {
                                        if (element.company_id == sessionCompanyId) {
                                            selectedCompany = element;
                                            return;
                                        }
                                    });
                                    if (selectedCompany) {
                                        companyStatus = false;
                                        this.setSelectedCompany(selectedCompany);
                                    }
                                }

                                if (companyStatus) {

                                    this.company = result.data.defaultCompanyInformation;
                                    this.selectedCompanyRow = this.company.company_id;
                                    this.company.company_data = this.checkCompanyData(this.company);
                                    if (this.company.companyUsers) {
                                        this.userRowsOnPage = this.company.companyUsers.length;
                                    }
                                    this.setAccountManagerData(productId, clientId);
                                    this.setCompanyUrls(productId, this.company.company_id);
                                    this.setCompanyToSession()
                                }
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
                                let sessionCompanyData = JSON.parse(this._globalService.getCompany());
                                let companyStatus = true;
                                if (sessionCompanyData && sessionCompanyData != null && typeof sessionCompanyData != 'undefined') {
                                    let sessionCompanyId = this._globalService.decode(sessionCompanyData.company_id);
                                    let selectedCompany: Company;
                                    this.companies.forEach(element => {
                                        if (element.company_id == sessionCompanyId) {
                                            selectedCompany = element;
                                            return;
                                        }
                                    });
                                    if (selectedCompany) {
                                        companyStatus = false;
                                        this.setSelectedCompany(selectedCompany);
                                    }
                                }
                                if (companyStatus) {
                                    this.company = result.data.defaultCompanyInformation;
                                    this.client = this.product['clients'][this.company.client_id]
                                    this.selectedCompanyRow = this.company.company_id;
                                    this.company.company_data = this.checkCompanyData(this.company);
                                    this.userRowsOnPage = this.company.companyUsers.length;
                                    this.setAccountManagerData(productId, clientId);
                                    this.setCompanyUrls(productId, this.company.company_id);
                                    this.setCompanyToSession()
                                }
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
        this.uploadFilesLink = url + '/employer-info/payroll/upload-documents';
        this.documentsHistoryLink = url + '/employer-info/payroll/documents-history';
        this.medicalPlanDataLink = url + '/employer-info/enrollments';
    }
    /**
     * 
     */
    public setBrandData() {
        let brand = this._globalService.getBrand();
        if (brand && brand != null && typeof brand != 'undefined') {
            let mobile = brand.support_phone;
            mobile = mobile.replace(/[`()|\-\/\ ]/gi, '');
            mobile = '(' + mobile.slice(0, 3) + ') ' + '' + mobile.slice(3, 6) + '-' + mobile.slice(6, 10);
            this.brandInformation = {
                'brand_logo': brand.brand_logo,
                "support_email": brand.support_email,
                "support_phone": mobile,
                'terms_conditions_url': brand.terms_conditions_url
            }
            this.clientLogo = this.logoPath + brand.brand_logo;
            let termsUrl: string = brand.terms_conditions_url;
            if (termsUrl) {
                termsUrl = termsUrl.replace(/^https?:\/\//, '')
            }
            this.termsLink = 'https://' + termsUrl;
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
            this.accountManager = '';
            this.accountManagerNumber = '';
            this.accountManagerMail = '';
            if (client['account_manager_name'] != 'null' && client['account_manager_name'] != '') {
                this.accountManager = client['account_manager_name'];
            }
            if (client['account_manager_number'] && client['account_manager_number'] != 'null' && client['account_manager_number'] != '') {
                let mobile = client['account_manager_number'];
                //  mobile = mobile.replace(/[`()|\-\/\ ]/gi, '');
                this.accountManagerNumber = mobile;
            }
            if (client['account_manager_mail'] != 'null' && client['account_manager_mail'] != '') {
                this.accountManagerMail = client['account_manager_mail'];
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


    public getIsCompletedInfo(companyid) {
        return this._http.get(
            this._apiUrl + '/get-is-completed-info/' + companyid,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json().data)
            .catch(this._globalService.handleError);
    }

    /**
     * 
     * @param vht 
     */
    changeStyle(vht = false) {

        this.vht = '';
        this.aca16 = '';
        this.aca17 = '';
        if (vht) {
            this.vht = 'active';
            return true;
        }
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
        return this.productService;
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
        this.product = this.getProductFieldFromSession(company.product_id);
        this.client = this.product['clients'][company.client_id]
        this.getProductServiceName(this.product.product_type);
        let userType = localStorage.getItem('usertype');
        this.changeStyle();
        this.dashBoard = false;
        if (userType != '4' && this.client && (this.client['primaryData'] == null || !this.client['primaryData'])) {
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

    setSelectedCompany(selectedCompany: Company) {
        this.splitUrl = '';
        this.getCompanyInformation(selectedCompany.company_id).subscribe(result => {
            if (result.success) {
                let productId = this.productParams;
                let clientId = selectedCompany.client_id;
                let companyInformation = result.data;
                this.setAccountManagerData(companyInformation.product_id, companyInformation.client_id);
                this.setCompany(companyInformation);
                // Generate the URL:
                let url = this._router.createUrlTree(['/client/' +
                    this._globalService.encode(companyInformation.product_id) +
                    '/' +
                    this._globalService.encode(companyInformation.client_id) + '/dashboard'])
                    .toString();
                // Change the URL without navigate:
                this.location.go(url);
            }
        }, error => {
            this.toastrService.error(error.data.message);
        });
    }

    /**
     * 
     * @param company 
     */
    public checkCompanyData(company): boolean {
        if (!company.company_ein) {
            return false;
        }
        if (!company.basicReporting) {
            return false;
        }
        if (!company.benefitPlan) {
            return false;
        }
        if (!company.planClasses) {
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
        let products = this._globalService.getProducts();
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
        return this._httpService.get(
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
            'purchase_id': this._globalService.encode(this.company.purchase_id),
            'company_id': this._globalService.encode(this.company.company_id),
            'product_id': this._globalService.encode(this.product.product_id),
            'client_id': this._globalService.encode(this.company.client_id),
            'company_ein': this.company.company_ein,
            'company_name': this.company.company_name,
            'primary_data': this.company.primary_data,
            'onBoarding_data': this.company.onBoarding_data,
            'basicReporting': this.company.basicReporting,
            'benefitPlan': this.company.benefitPlan,
            'planClasses': this.company.planClasses

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
        this.setCompanyToSession();
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
    /**
     *  Setting active product
     */
    public setActiveProduct() {
        let company = JSON.parse(this._globalService.getCompany());
        let productId = this._globalService.decode(company.product_id);
        let products = this._globalService.getProducts();
        this.product = products[productId];
        if (this.product) {
            this.changeStyle();
        }
    }

    /**
     * getClientDashBoardData
     */
    public getClientDashBoardData(clientId): Observable<any> {
        return this._http.get(
            this._apiUrl + '/get-client-dashboard-data/' + clientId,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json())
            .catch(this._globalService.handleError);
    }
    /**
     * 
     * @param info 
     */
    public redirectToClientDashBoard(info: any, productSelectedStatus = false) {
        if (info.client_id) {
            this.getClientDashBoardData(info.client_id)
                .subscribe((result) => {
                    if (result.success) {
                        localStorage.setItem('productsAndClients', '');
                        localStorage.setItem('productsAndClients', JSON.stringify(result.data))
                        let products = this._globalService.getProducts();
                        if (products && products != null && products != 'null' && products != '') {
                            let productsList = Object.keys(products).map(function (key) {
                                return products[key]
                            })
                            let product;
                            let maxApplicableYear = 0;
                            if (productSelectedStatus) {
                                product = products[info.product_id];
                            } else {
                                productsList.forEach(element => {
                                    if (element.applicable_year > maxApplicableYear) {
                                        maxApplicableYear = element.applicable_year
                                        product = element;
                                    }
                                });
                            }
                            if (product.product_id) {
                                if (product.product_name.toLowerCase() == 'vht') {
                                    this._router.navigate(['/client/vht']);
                                } else {

                                    let clientKeys: any[] = Object.keys(product.clients);
                                    let client = product['clients'][clientKeys[0]];
                                    let clientId: any = this._globalService.encode(client['client_id']);
                                    let productId: any = this._globalService.encode(product.product_id);
                                    this.setBrandData()
                                    this._router.navigate(['/client/' + productId + '/' + clientId + '/dashboard']);
                                }
                            } else {
                                this._router.navigate(['/products-not-exists']);
                            }

                        } else {
                            this._router.navigate(['/products-not-exists']);
                        }
                    } else {
                        this.toastrService.error(result.data);
                    }
                },
                error => {
                    this.toastrService.error(error.data);
                }
                );
        } else {
            this.toastrService.error("Client id not exists");
        }
    }
}


