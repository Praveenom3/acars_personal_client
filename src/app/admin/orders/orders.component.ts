import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { OrdersService } from "app/_services/_orders.service";
import { ToastrService } from "ngx-toastr";
import { Clients } from "app/_models/clients";
import { Brands } from "app/_models/brands";
import { ModalDirective } from "ngx-bootstrap";
import { NumberValidationService } from "app/_services/_number-validation.service";
import * as Globals from 'app/_shared/_globals';
import { GlobalService } from 'app/_services/_global.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { OldClientsSearchService } from 'app/_services/_old_clients_search.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    _branderrorMessage: any;
    isOldClient: boolean = false;
    minDate = new Date(2017, 0, 1);
    maxDate = new Date(2025, 12, 31);
    colorTheme = 'theme-blue';
    public bsConfig: Partial<BsDatepickerConfig>;


    purchaseSelected: any;
    hasFinancialRights: boolean = false;
    formToReset: any;
    askConfirm: boolean = false;
    isVhtProduct: boolean = false;
    tempModal: any;
    public temp_arr = [];
    tempAvailableProducts: any;

    _addClientFormSubmitted = false;
    _addPurchaseFormSubmitted = false;
    _updateClientFormSubmitted = false;
    _updatePurchaseFormSubmitted = false;

    @ViewChild('addClientModal') public addClientModal: ModalDirective;
    @ViewChild('updateClientModal') public updateClientModal: ModalDirective;
    @ViewChild('addPurchaseModal') public addPurchaseModal: ModalDirective;
    @ViewChild('updatePurchaseModal') public updatePurchaseModal: ModalDirective;

    @ViewChild('closeConfirmationModal') public closeConfirmationModal: ModalDirective;
    @ViewChild('deleteModal') public deleteModal: ModalDirective;

    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

    public no_of_forms_list = [
        {
            'form_name': 'UP TO 100 FORMS',
            'form_value': '0-100'
        },
        {
            'form_name': '100 - 500 FORMS',
            'form_value': '100-500'
        },
        {
            'form_name': '500 - 1,000 FORMS',
            'form_value': '500-1000'
        },
        {
            'form_name': '1,000 - 1,500 FORMS',
            'form_value': '1000-1500'
        },
        {
            'form_name': '1,500 - 2,000 FORMS',
            'form_value': '1500-2000'
        },
        {
            'form_name': '2,000 - 2,500 FORMS',
            'form_value': '2000-2500'
        },
        {
            'form_name': '2,500 - 3,000 FORMS',
            'form_value': '2500-3000'
        },
        {
            'form_name': '3,000 - 3,500 FORMS',
            'form_value': '3000-3500'
        },
        {
            'form_name': '3,500 - 4,000 FORMS',
            'form_value': '3500-4000'
        },
        {
            'form_name': '4,000 - 4,500 FORMS',
            'form_value': '4000-4500'
        },
        {
            'form_name': '4,500 - 5,000 FORMS',
            'form_value': '4500-5000'
        },
        {
            'form_name': '5,000 - 6,000 FORMS',
            'form_value': '5000-6000'
        },
        {
            'form_name': '6,000 - 7,000 FORMS',
            'form_value': '6000-7000'
        },
        {
            'form_name': '7,000 - 8,000 FORMS',
            'form_value': '7000-8000'
        },
        {
            'form_name': '8,000 - 9,000 FORMS',
            'form_value': '8000-9000'
        },
        {
            'form_name': '9,000 - 10,000 FORMS',
            'form_value': '9000-10000'
        },
        {
            'form_name': '10,000 - 11,000 FORMS',
            'form_value': '10000-11000'
        },
        {
            'form_name': '11,000 - 12,000 FORMS',
            'form_value': '11000-12000'
        },
        {
            'form_name': '12,000 - 13,000 FORMS',
            'form_value': '12000-13000'
        },
        {
            'form_name': '13,000 - 14,000 FORMS',
            'form_value': '13000-14000'
        },
        {
            'form_name': '14,000 - 15,000 FORMS',
            'form_value': '14000-15000'
        },
        {
            'form_name': '15,000 - 16,000 FORMS',
            'form_value': '15000-16000'
        },
        {
            'form_name': '16,000 - 17,000 FORMS',
            'form_value': '16000-17000'
        },
        {
            'form_name': '17,000 - 18,000 FORMS',
            'form_value': '17000-18000'
        },
        {
            'form_name': '18,000 - 19,000 FORMS',
            'form_value': '18000-19000'
        },
        {
            'form_name': '19,000 - 20,000 FORMS',
            'form_value': '19000-20000'
        }
    ];

    public temp_brand_id = '';
    public temp_brand_id_add: Brands;
    public temp_brand = '';
    public temp_product = '';
    public temp_client_name = '';
    public temp_client_number = '';
    public temp_new_index = -1;
    public temp_total_index = -1;
    public show_account_manager = 0;

    public orders;
    public clientsTableData;
    maxClientNumber: any;
    availableProducts: any;
    selectableProducts: any[];
    public availableBrands: Brands[];
    public availableAcctManagers: any[];
    public totalPurchases = [];
    public newPurchases = [];
    public updatePurchases = [];
    valueChangedForm: any;

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortOrder = "asc";
    public sortBy = "";

    public _addClientForm: FormGroup;
    public _addPurchaseForm: FormGroup;
    public _updateClientForm: FormGroup;
    public _updatePurchaseForm: FormGroup;

    _errorMessage: any;
    _addClientFormErrors: any;
    _updatePurchaseFormErrors: any;
    _addPurchaseFormErrors: any;
    _updateClientFormErrors: any;
    _clearFormErrors: any;

    constructor(
        private _globalService: GlobalService,
        private _formBuilder: FormBuilder,
        private ordersService: OrdersService,
        private clientSearchService: OldClientsSearchService,
        private toastrService: ToastrService) {

        this._addClientForm = _formBuilder.group({
            client_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            brand_id: ['', Validators.compose([Validators.required])],
            client_number: ['']
        });

        this._updateClientForm = _formBuilder.group({
            client_id: [''],
            client_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            brand_id: [{ value: '', disabled: false }, Validators.compose([Validators.required])],
            client_number: ['']
        });

        this._addPurchaseForm = _formBuilder.group({
            product_id: ['', Validators.compose([Validators.required])],
            total_no_eins: ['', Validators.compose([Validators.required, Validators.maxLength(3), this.maxValue(15), this.minValue(1)])],
            total_no_forms: ['', Validators.compose([Validators.required])],
            purchaser_first_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            purchaser_last_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            purchaser_email: ['', Validators.compose([Validators.required, Validators.pattern(this._globalService.emailRegx)])],
            purchaser_mobile: ['', Validators.compose([Validators.required, Validators.minLength(14)])],
            purchase_status: ['', Validators.compose([Validators.required])],
            amount: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*([1-9]+)\d*(?:\.\d{1,2})?\s*$/)])],
            account_manager: ['', Validators.compose([Validators.required])],
            purchase_date: ['', Validators.compose([Validators.required])],
            is_invoice: ['', Validators.compose([Validators.required])],
            invoice_no: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            invoice_created_at: ['', Validators.compose([Validators.required])],
            is_invoice_paid: ['0', Validators.compose([Validators.required])],
            is_primary_contact: [''],
            is_billing_contact: [''],
            is_agreement_signed: [''],
            is_new_purchase: [1]
        });

        this._updatePurchaseForm = _formBuilder.group({
            purchase_user_id: [''],
            purchase_id: [''],
            product_id: ['', Validators.compose([Validators.required])],
            total_no_eins: ['', Validators.compose([Validators.required, Validators.maxLength(3), this.maxValue(15), this.minValue(1)])],
            total_no_forms: ['', Validators.compose([Validators.required])],
            purchaser_first_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            purchaser_last_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            purchaser_email: ['', Validators.compose([Validators.required, Validators.pattern(this._globalService.emailRegx)])],
            purchaser_mobile: ['', Validators.compose([Validators.required, Validators.minLength(14)])],
            purchase_status: ['', Validators.compose([Validators.required])],
            amount: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*([1-9]+)\d*(?:\.\d{1,2})?\s*$/)])],
            account_manager: ['', Validators.compose([Validators.required])],
            purchase_date: ['', Validators.compose([Validators.required])],
            is_invoice: ['', Validators.compose([Validators.required])],
            invoice_no: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            invoice_created_at: ['', Validators.compose([Validators.required])],
            is_invoice_paid: ['0', Validators.compose([Validators.required])],
            is_primary_contact: [''],
            is_billing_contact: [''],
            is_agreement_signed: [''],
            is_new_purchase: [0]
        });

        this._addClientForm.valueChanges
            .subscribe(addClientData => this.onValueChanged(this._addClientForm, this._addClientFormErrors, addClientData, ));

        this._updateClientForm.valueChanges
            .subscribe(updateClientData => this.onValueChanged(this._updateClientForm, this._updateClientFormErrors, updateClientData));

        this._addPurchaseForm.valueChanges
            .subscribe(addPurchaseData => this.onValueChanged(this._addPurchaseForm, this._addPurchaseFormErrors, addPurchaseData));

        this._updatePurchaseForm.valueChanges
            .subscribe(updatePurchaseData => this.onValueChanged(this._updatePurchaseForm, this._updatePurchaseFormErrors, updatePurchaseData));

    }

    ngOnInit() {
        // this.selectByName("2");
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme, showWeekNumbers: false });
        //checking if the user has the financial rights
        for (var key in Globals.admin_permissions) {
            if (Globals.admin_permissions.hasOwnProperty(key)) {
                if (Globals.admin_permissions[key] == 'Financials') {
                    let admin_permissions = JSON.parse(localStorage.getItem('admin_permissions'));
                    admin_permissions.forEach(element => {
                        if (element == key) {
                            this.hasFinancialRights = true;
                        }
                    });
                }
            }
        }

        this.orders = this.getOrders();
        this._resetFormErrors();
    }


    public ClientNamefocusOut(keyword) {
        if (keyword != "") {
            this.clientSearchService.getClientDetails(keyword)
                .subscribe((client) => {
                    if (client) {
                        this._addClientForm.get('brand_id').disable();
                        this.isOldClient = true;
                        this._addClientForm.reset();
                        this._resetFormErrors();
                        this.temp_client_number = client.client_number;
                        this.temp_brand = client.brand.brand_name;
                        this.temp_client_name = client.client_name;
                        this._addClientForm.controls['client_name'].setValue(client.client_name);
                        this._addClientForm.controls['client_number'].patchValue(client.client_number);
                        this.selectBrand(client.brand_id);
                    } else {
                        this.isOldClient = false;
                        this._addClientForm.reset();
                        this._resetFormErrors();
                        this.temp_brand = "";
                        this.temp_brand_id_add = null;
                        this._addClientForm.controls['brand_id'].patchValue(this.temp_brand_id_add);
                        this.temp_client_number = '';
                        this._addClientForm.controls['client_name'].patchValue(keyword);
                        this._addClientForm.get('brand_id').enable();
                    }
                },
                error => { this._errorMessage = error.data.message; }
                );
        }

    }

    public selectBrand(brand: any) {
        this.temp_brand_id_add = null;
        this.temp_brand_id_add = this.availableBrands.find(brands => brands.brand_id == brand);
        this._addClientForm.controls['brand_id'].patchValue(this.temp_brand_id_add);
       
    }

    /*getting orders from service*/
    private getOrders() {
        this.ordersService.getOrders()
            .subscribe((orders) => {
                this.orders = orders;
                this.clientsTableData = orders.clientsInformation;
                this.maxClientNumber = orders.maxClientNumber;
                this.availableBrands = orders.brandsInformation;
                this.availableAcctManagers = orders.accountManagerInformation;

                this.availableProducts = JSON.parse(JSON.stringify(orders.productsInformation));
                this.tempAvailableProducts = JSON.parse(JSON.stringify(orders.productsInformation));

                this.getSelectableProducts();
            },
            error => { this._errorMessage = error.data }
            );
    }

    public getSelectableProducts(client_id?, product_id?, mode?) {
        if (mode == 'clientAddPurchase') {
            //before submit
            //for the update client scenario
            if (client_id) {
                //getting the purchases already saved in the db and assigning is_deleted to 1
                this.clientsTableData.forEach(clientElement => {
                    if (clientElement.client_id == client_id) {
                        clientElement.clientPurchases.forEach(purchaseElement => {
                            let product_full_name = this.getItemName('product', purchaseElement.product_id);

                            this.selectableProducts.forEach((selectableProductElement, index) => {
                                Globals.products_keywords.forEach(product_key => {
                                    if (product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                                        if (selectableProductElement.product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                                            this.selectableProducts[index].is_deleted = 1;
                                        }
                                    }
                                });
                            });
                        });
                    }
                });
            }

            //returning the already made purchases is_deleted status to 1 which have been toggled in the update purchase scenario
            if (this.temp_arr) {
                this.temp_arr.forEach(tempArrElement => {
                    this.selectableProducts.forEach((selectableProductElement, index) => {
                        if (selectableProductElement.product_full_name == tempArrElement.product_full_name) {
                            this.selectableProducts[index].is_deleted = 1;
                        }
                    });
                });
                this.temp_arr = [];
            }

            //after submit
            if (product_id) {
                let product_full_name = this.getItemName('product', product_id);

                this.selectableProducts.forEach((selectableProductElement, index) => {
                    Globals.products_keywords.forEach(product_key => {
                        if (product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                            if (selectableProductElement.product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                                this.selectableProducts[index].is_deleted = 1;
                            }
                        }
                    });
                });
            }

        } else if (mode == 'clientUpdatePurchaseBeforeSubmit') {

            //returning the already made purchases is_deleted status to 1 which have been toggled in the update purchase scenario
            if (this.temp_arr) {
                this.temp_arr.forEach(tempArrElement => {
                    this.selectableProducts.forEach((selectableProductElement, index) => {
                        if (selectableProductElement.product_full_name == tempArrElement.product_full_name) {
                            this.selectableProducts[index].is_deleted = 1;
                        }
                    });
                });
                this.temp_arr = [];
            }

            //get all selectable products from available
            if (product_id) {
                let product_full_name = this.getItemName('product', product_id);

                Globals.products_keywords.forEach(product_key => {
                    if (product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                        this.availableProducts.forEach((availableProductElement, index) => {
                            if (availableProductElement.product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                                if (availableProductElement.is_deleted == 0) {
                                    this.temp_arr.push(this.availableProducts[index]);
                                    this.selectableProducts[index].is_deleted = 0;
                                }
                            }
                        });
                    }
                });

                let mid_arr = [];
                mid_arr = this.temp_arr;
                this.temp_arr = this.selectableProducts;
                this.selectableProducts = mid_arr;

            }

        } else if (mode == 'clientUpdatePurchaseAfterSubmit') {

            if (product_id) {
                let product_full_name = this.getItemName('product', product_id);

                //if product_id exists in previously selected products package
                Globals.products_keywords.forEach(product_key => {
                    if (product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                        this.availableProducts.forEach((availableProductElement, index) => {
                            if (availableProductElement.product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                                this.selectableProducts[index].is_deleted = 1;
                            }
                        });
                    }
                });
            }
            this.temp_arr = [];
        } else if (mode == 'rollbackTempArrWithSelected') {

            if (this.temp_arr.length > 0) {
                let mid_arr = [];
                mid_arr = this.temp_arr;
                this.temp_arr = this.selectableProducts;
                this.selectableProducts = mid_arr;

            }
        } else {
            //getting all the available products.. This stmt alone can be used in the freshly adding client scenario also
            this.selectableProducts = JSON.parse(JSON.stringify(this.availableProducts));
            this.temp_arr = [];
        }
    }

    public toggleInvoiceFieldsValidator(form, status) {
        if (status == true) {

            form.controls['invoice_no'].setValidators(Validators.compose([Validators.required, Validators.maxLength(30)]));
            form.controls['invoice_created_at'].setValidators(Validators.compose([Validators.required]));
            form.controls['is_invoice_paid'].setValidators(Validators.compose([Validators.required]));

            form.controls['invoice_no'].updateValueAndValidity();
            form.controls['invoice_created_at'].updateValueAndValidity();
            form.controls['is_invoice_paid'].updateValueAndValidity();

        } else {
            form.controls['invoice_no'].reset();
            form.controls['invoice_created_at'].reset();
            form.controls['is_invoice_paid'].reset();

            form.controls['invoice_no'].setValidators(null);
            form.controls['invoice_created_at'].setValidators(null);
            form.controls['is_invoice_paid'].setValidators(null);

            form.controls['invoice_no'].updateValueAndValidity();
            form.controls['invoice_created_at'].updateValueAndValidity();
            form.controls['is_invoice_paid'].updateValueAndValidity();

        }
    }


    public openModal(modal, data?: any) {
        this._errorMessage = '';

        if (modal == 'addClientModal') {
            this.temp_brand_id_add = null;
            this._addClientForm.get('brand_id').enable();
            this._addClientFormSubmitted = false;

            this.totalPurchases = [];
            this.newPurchases = [];
            this.getSelectableProducts();

            this.addClientModal.show();

        } else if (modal == 'updateClientModal') {
            this._updateClientFormSubmitted = false;

            this.totalPurchases = [];
            this.newPurchases = [];

            this.patchValue(this._updateClientForm, data);

            data.clientPurchaseUsers.forEach(purchaseUser => {
                data.clientPurchases.forEach(purchase => {
                    if (purchaseUser.purchase_id == purchase.purchase_id) {
                        var obj = Object.assign(purchaseUser, purchase);
                        this.totalPurchases.push(obj);
                    }
                });
            });

            this.getSelectableProducts();

            this.temp_brand = this.getItemName('brand', this._updateClientForm.value.brand_id);
            this.temp_client_number = this._updateClientForm.value.client_number;

            this.updateClientModal.show();
        } else if (modal == 'addPurchaseModal') {
            if (this._updateClientForm.value.client_id) {
                this.getSelectableProducts(this._updateClientForm.value.client_id, '', 'clientAddPurchase');
            } else {
                this.getSelectableProducts('', '', 'clientAddPurchase');
            }

            this.checkNewAndUpdatePurchasesList();

            this._addPurchaseFormSubmitted = false;

            this.addPurchaseModal.show();

        } else if (modal == 'updatePurchaseModal') {

            /*    if (this._updateClientForm.value.client_id) {
                    this.getSelectableProducts(this._updateClientForm.value.client_id, '', 'clientAddPurchase');
                } else {
                    this.getSelectableProducts('', '', 'clientAddPurchase');
                } */
            this.temp_product = this.getItemName('product', data.product_id);

            this._updatePurchaseFormSubmitted = false;
            data.purchaser_mobile = data.purchaser_mobile.replace(/[`()|\-\/\ ]/gi, '');
            data.purchaser_mobile = '(' + data.purchaser_mobile.slice(0, 3) + ') ' + '' + data.purchaser_mobile.slice(3, 6) + '-' + data.purchaser_mobile.slice(6, 10);
            if (data.hasOwnProperty('is_new_purchase') && data.is_new_purchase == 1) {
                this.temp_new_index = this.newPurchases.indexOf(data);
            }

            this.temp_total_index = this.totalPurchases.indexOf(data);

            this.patchValue(this._updatePurchaseForm, data);


            let totalMaxEins: number = parseInt(this._updatePurchaseForm.value.total_no_eins) + 15;
           
            this._updatePurchaseForm.controls['total_no_eins'].setValidators(Validators.compose([Validators.required, this.maxValue(totalMaxEins), this.minValue(1), NumberValidationService.min(this._updatePurchaseForm.value.total_no_eins), Validators.maxLength(3)]));


            this._updatePurchaseForm.controls['total_no_eins'].updateValueAndValidity();

            if (this._updateClientForm.value.client_id) {
                this.getSelectableProducts('', this._updatePurchaseForm.value.product_id, 'clientUpdatePurchaseBeforeSubmit');
            } else {
                this.getSelectableProducts(this._updateClientForm.value.client_id, '', 'clientAddPurchase');
                this.getSelectableProducts('', this._updatePurchaseForm.value.product_id, 'clientUpdatePurchaseBeforeSubmit');
            }

            this.checkNewAndUpdatePurchasesList(this._updateClientForm.value.client_id);


            //setting validators for invoice dependant inputs
            if (this._updatePurchaseForm.value.is_invoice == '1' || this._updatePurchaseForm.value.is_invoice == 1) {
                this.toggleInvoiceFieldsValidator(this._updatePurchaseForm, true);
            } else {
                this.toggleInvoiceFieldsValidator(this._updatePurchaseForm, false);
            }
            this.validationMessages.total_no_eins.min = 'EIN count should be greater than the current value of ' + this._updatePurchaseForm.value.total_no_eins;
            this.validationMessages.total_no_eins.maxValue = "Total No. of EIN's should be less than or equal to " + totalMaxEins;
            this.updatePurchaseModal.show();
        }
    }

    patchValue(form, values): void {
        Object.keys(values).forEach(name => {

            if (form.controls[name]) {
                form.controls[name].patchValue(values[name]);
                form.controls[name].updateValueAndValidity();
            }
        });
    }

    public closeModal(modal) {
        if (modal == 'addClientModal') {
            if (this.askConfirm == true) {
                this.tempModal = this.addClientModal;
                this.closeConfirmationModal.show();
                this.formToReset = this._addClientForm;
            } else {
                this.addClientModal.hide();
                this._resetFormValues(this._addClientForm);
            }
        } else if (modal == 'updateClientModal') {
            if (this.askConfirm == true) {
                this.tempModal = this.updateClientModal;
                this.closeConfirmationModal.show();
                this.formToReset = this._updateClientForm;
            } else {
                this.updateClientModal.hide();
                this._resetFormValues(this._updateClientForm);
            }

        } else if (modal == 'addPurchaseModal') {
            this.addPurchaseModal.hide();
            this._resetFormValues(this._addPurchaseForm);
        } else if (modal == 'updatePurchaseModal') {
            this.getSelectableProducts('', '', 'rollbackTempArrWithSelected');
            this.updatePurchaseModal.hide();
            this._resetFormValues(this._updatePurchaseForm);
        }
        this._resetFormErrors();
    }

    public getItemName(item_type, item_value) {

        if (item_type == 'product') {

            for (var i = 0; i < this.availableProducts.length; i++) {
                if (this.availableProducts[i].product_id == item_value) {
                    return this.availableProducts[i].product_full_name;
                }
            }
        } else if (item_type == 'brand') {
            for (var i = 0; i < this.availableBrands.length; i++) {
                if (this.availableBrands[i].brand_id == item_value) {
                    return this.availableBrands[i].brand_name;
                }
            }
        }
        return "NA";
    }

    public checkNewAndUpdatePurchasesList(client_id?) {
        if (this.newPurchases.length > 0) {
            this.newPurchases.forEach((newProductElement, index) => {
                let product_full_name = this.getItemName('product', newProductElement.product_id);

                this.selectableProducts.forEach((selectableProductElement, index) => {
                    Globals.products_keywords.forEach(product_key => {
                        if (product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                            if (selectableProductElement.product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                                this.selectableProducts[index].is_deleted = 1;
                            }
                        }
                    });
                });
            });
        }
        if (this.updatePurchases.length > 0) {

            this.updatePurchases.forEach((updateProductElement, index) => {
                //change the previously selected value of the update purchase to not deleted status
                this.clientsTableData.forEach(clientx => {
                    if (clientx.client_id == client_id) {
                        clientx.clientPurchases.forEach(purchase => {
                            if (purchase.purchase_id == updateProductElement.product_id) {
                                let product_full_name = this.getItemName('product', updateProductElement.product_id);

                                Globals.products_keywords.forEach(product_key => {
                                    if (product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                                        this.availableProducts.forEach((availableProductElement, index) => {
                                            if (availableProductElement.product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                                                if (availableProductElement.is_deleted == 0) {
                                                    this.selectableProducts[index].is_deleted = 0;
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }

                });
                //assigning the newly selected product to deleted status
                let product_full_name = this.getItemName('product', updateProductElement.product_id);

                this.selectableProducts.forEach((selectableProductElement, index) => {
                    Globals.products_keywords.forEach(product_key => {
                        if (product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                            if (selectableProductElement.product_full_name.toLowerCase().indexOf(product_key.toLowerCase()) !== -1) {
                                this.selectableProducts[index].is_deleted = 1;
                            }
                        }
                    });
                });
            });
        }
    }

    public onSubmit(form) {
        if (form == this._addClientForm) {
            this._addClientFormSubmitted = true;

            if (this.isOldClient) {
                this._addClientForm.get('brand_id').enable();
            }

            if (this._addClientForm.value.brand_id.hasOwnProperty('brand_id')) {
                this._addClientForm.value.brand_id = this._addClientForm.value.brand_id.brand_id;
            }

            this._addClientForm.value.client_number = this.temp_client_number;

            let data = {
                "Clients": this._addClientForm.value,
                "purchases": this.totalPurchases
            };


            this.ordersService.createClientsAndPurchases(data).subscribe(
                result => {
                    if (result.success) {

                        this.orders = this.getOrders();
                        this.askConfirm = false;
                        this.closeModal('addClientModal');
                        this.toastrService.success('Client and Purchases Added Succesfully.');
                    } else {
                        if (this.isOldClient) {
                            this._addClientForm.get('brand_id').disable();
                        }
                        this.toastrService.error('Trouble adding the client. Please try later.');
                        this._addClientFormSubmitted = false;
                    }
                },
                error => {
                    this._addClientFormSubmitted = false;
                    if (this.isOldClient) {
                        this._addClientForm.get('brand_id').disable();
                    }
                    if (error.status == 422) {

                        this._resetFormErrors();

                        let errorFields = JSON.parse(error.data.message);
                        this.toastrService.error('Trouble adding the client. Please try later.');
                        //   this._setFormErrors(this._addClientFormErrors, errorFields);
                    } else {

                        //this._errorMessage = error.data;
                        this.toastrService.error('Trouble adding the client. Please try later.');
                    }
                });

        } else if (form == this._updateClientForm) {

            if (this._updateClientForm.value.brand_id.hasOwnProperty('brand_id')) {
                this._updateClientForm.value.brand_id = this._updateClientForm.value.brand_id.brand_id;
            }

            let allPurchases = [];
            if (this.newPurchases.length > 0) {
                allPurchases = this.newPurchases;
            }
            if (this.updatePurchases.length > 0) {
                allPurchases = allPurchases.concat(this.updatePurchases);
            }

            let data = {
                "Clients": this._updateClientForm.value,
                "purchases": allPurchases
            };

            this._updateClientFormSubmitted = true;

            this.ordersService.updateClientAndCreateNewPurchases(data).subscribe(
                result => {
                    if (result.success) {
                        this.orders = this.getOrders();
                        this.updatePurchases = [];
                        this.askConfirm = false;
                        this.closeModal('updateClientModal');
                        this.toastrService.success('Client updated Succesfully.');
                    } else {
                        this.toastrService.error('Trouble in updating client. Please try later.');
                        this._updateClientFormSubmitted = false;
                    }
                },
                error => {
                    this._updateClientFormSubmitted = false;
                    if (error.status == 422) {
                        this._resetFormErrors();
                        let errorMessage = JSON.parse(error.data.message);
                        this.toastrService.error('Trouble in updating client. Please try later.' + errorMessage);
                        //   this._setFormErrors(this._addClientFormErrors, errorFields);
                    } else {
                        //this._errorMessage = error.data;
                        this.toastrService.error('Trouble in updating client. Please try later.');
                    }
                });

        } else if (form == this._addPurchaseForm) {

            //removing spl chars from purchaser mobile
            form.value.purchaser_mobile = form.value.purchaser_mobile.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\ ]/gi, '');

            let data = {
                "client_email": form.value.purchaser_email
            };

            this._addPurchaseFormSubmitted = true;

            this.ordersService.validateClientEmail(data).subscribe(
                result => {
                    if (result.success) {

                        this.newPurchases.push(form.value);
                        this.totalPurchases.push(form.value);

                        this.getSelectableProducts('', form.value.product_id, 'clientAddPurchase');

                        this.closeModal('addPurchaseModal');

                    } else {
                        this.toastrService.error('Trouble validating the Purchaser Email. Please try later.');
                        this._addPurchaseFormSubmitted = false;
                    }
                },
                error => {
                    this._addPurchaseFormSubmitted = false;
                    if (error.status == 422) {
                        this._resetFormErrors();
                        this._addPurchaseFormErrors['purchaser_email'].valid = false;
                        this._addPurchaseFormErrors['purchaser_email'].message = error.data.message;
                        //this._errorMessage = "Trouble updating the Client. Please try later."
                        //this._setFormErrors(this._addPurchaseFormErrors, errorFields);
                    } else {
                        this.toastrService.error('Trouble validating the Purchaser Email. Please try later.');
                    }
                });

            this.askConfirm = true;

        } else if (form == this._updatePurchaseForm) {

            //removing spl chars from purchaser mobile
            form.value.purchaser_mobile = form.value.purchaser_mobile.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\ ]/gi, '');

            if (this.temp_total_index !== -1) {
                this.totalPurchases[this.temp_total_index] = form.value;
            }
            //resetting temp_total_index value
            this.temp_total_index = -1;

            if (form.value.hasOwnProperty('is_new_purchase') && form.value.is_new_purchase == 1) {
                if (this.temp_new_index !== -1) {
                    this.newPurchases[this.temp_new_index] = form.value;
                }
                this.temp_new_index = -1;
            } else {
                this.updatePurchases.push(form.value);
            }

            this.getSelectableProducts('', '', 'rollbackTempArrWithSelected');
            this.getSelectableProducts('', form.value.product_id, 'clientUpdatePurchaseAfterSubmit');

            this.closeModal('updatePurchaseModal');
            this.askConfirm = true;

        }
    }

    public onBrandChange(form, value) {

        if (form == this._addClientForm) {
            if(this.isOldClient == false){
                if (value) {
                    if (value.hasOwnProperty('brand_name')) {
                        this.temp_brand = value.brand_name;
                        this.temp_client_number = this.temp_brand.substring(0, 3) + '-' + this.maxClientNumber;
                    } else {
                        this.temp_brand = this.getItemName('brand', value);
    
                        if (this.temp_brand !== 'NA') {
                            this.temp_client_number = this.temp_brand.substring(0, 3) + '-' + this.maxClientNumber;
                        } else {
                            this.temp_client_number = '';
                            this.temp_brand = '';
                        }
                    }
                } else{
                    this.temp_client_number = '';
                    this.temp_brand = '';
                }
            }
        } else if (form == this._updateClientForm) {
            if (value && value.hasOwnProperty('brand_name')) {
                this.temp_brand = value.brand_name;
            } else {
                this.temp_brand = '';
            }
        }
    }

    public onProductChange(form, value) {
        this.show_account_manager = 0;
        if (value) {
            for (var i = 0; i < this.availableProducts.length; i++) {
                if (this.availableProducts[i].product_id == value) {
                    this.show_account_manager = this.availableProducts[i].account_manager;

                    if (this.availableProducts[i].product_name.toLowerCase().indexOf("vht") !== -1) {
                        this.isVhtProduct = true;
                        form.controls['total_no_forms'].setValidators(null);
                        form.controls['total_no_forms'].updateValueAndValidity();
                    } else {
                        this.isVhtProduct = false;
                        form.controls['total_no_forms'].setValidators(Validators.compose([Validators.required]));
                        form.controls['total_no_forms'].updateValueAndValidity();
                    }

                    if (form == this._addPurchaseForm) {
                        this._addPurchaseFormErrors['total_no_forms'].valid = true;
                        this._addPurchaseFormErrors['total_no_forms'].message = '';
                    } else if (form == this._updatePurchaseForm) {
                        this._updatePurchaseFormErrors['total_no_forms'].valid = true;
                        this._updatePurchaseFormErrors['total_no_forms'].message = '';
                    }
                }
            }
        }

        if (this.show_account_manager == 1) {
            form.controls['account_manager'].setValidators(Validators.compose([Validators.required]));
            form.controls['account_manager'].updateValueAndValidity();
        } else {
            form.controls['account_manager'].setValidators(null);
            form.controls['account_manager'].updateValueAndValidity();
        }
    }

    public onValueChanged(form, formErrors, data?: any) {
        this._errorMessage = '';

        if (form) {
            for (let field in formErrors) {
                // clear previous error message (if any)
                let control = form.get(field);
                if (control && control.dirty) {
                    formErrors[field].valid = true;
                    formErrors[field].message = '';
                }
            }
        }
        return;
    }

    private _resetFormValues(form): void {
        form.reset();
        if (form == this._addPurchaseForm) {
            form.controls.is_new_purchase.setValue(1);
        }
        if (form == this._addPurchaseForm || form == this._updatePurchaseForm) {
            form.controls.product_id.setValue('');
            form.controls.purchase_status.setValue('');
            form.controls.is_invoice.setValue('');
            form.controls.is_invoice_paid.setValue('0');
            form.controls.account_manager.setValue('');
        }

        if (form == this._addClientForm || form == this._updateClientForm) {
            form.controls.brand_id.setValue('');
            this.temp_client_number = '';
            this.temp_brand = '';
            this.temp_new_index = -1;
            this.temp_total_index = -1;
        }
    }

    private _resetFormErrors(): void {
        this._addClientFormErrors = {
            client_name: { valid: true, message: '' },
            brand_id: { valid: true, message: '' },
            client_number: { valid: true, message: '' }
        };


        this._updateClientFormErrors = {
            client_id: { valid: true, message: '' },
            client_name: { valid: true, message: '' },
            brand_id: { valid: true, message: '' },
            client_number: { valid: true, message: '' }
        };

        this._addPurchaseFormErrors = {
            product_id: { valid: true, message: '' },
            total_no_eins: { valid: true, message: '' },
            total_no_forms: { valid: true, message: '' },
            purchaser_first_name: { valid: true, message: '' },
            purchaser_last_name: { valid: true, message: '' },
            purchaser_email: { valid: true, message: '' },
            purchaser_mobile: { valid: true, message: '' },
            purchase_status: { valid: true, message: '' },
            amount: { valid: true, message: '' },
            account_manager: { valid: true, message: '' },
            purchase_date: { valid: true, message: '' },
            is_invoice: { valid: true, message: '' },
            invoice_no: { valid: true, message: '' },
            invoice_created_at: { valid: true, message: '' },
            is_invoice_paid: { valid: true, message: '' }
        };

        this._updatePurchaseFormErrors = {
            purchase_user_id: { valid: true, message: '' },
            purchase_id: { valid: true, message: '' },
            product_id: { valid: true, message: '' },
            total_no_eins: { valid: true, message: '' },
            total_no_forms: { valid: true, message: '' },
            purchaser_first_name: { valid: true, message: '' },
            purchaser_last_name: { valid: true, message: '' },
            purchaser_email: { valid: true, message: '' },
            purchaser_mobile: { valid: true, message: '' },
            purchase_status: { valid: true, message: '' },
            amount: { valid: true, message: '' },
            account_manager: { valid: true, message: '' },
            purchase_date: { valid: true, message: '' },
            is_invoice: { valid: true, message: '' },
            invoice_no: { valid: true, message: '' },
            invoice_created_at: { valid: true, message: '' },
            is_invoice_paid: { valid: true, message: '' }
        };

    }

    private _setFormErrors(errorsForm, errorFields: any): void {
        for (let key in errorFields) {
            // skip loop if the property is from prototype
            if (!errorFields.hasOwnProperty(key)) continue;
            let message = errorFields[key];
            this._addClientFormErrors[key].valid = false;
            this._addClientFormErrors[key].message = message;
        }
    }

    private _isValid(form, formErrors, field): boolean {

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

    public validationMessages = {
        'client_name': {
            'required': 'Client Name is required.',
            'minlength': 'Client Number should be a minimum 3 chars.'
        },
        'brand_id': {
            'required': 'Brand is required.'
        },
        'client_number': {
            'required': 'Client Number is required.'
        },
        'purchase_user_id': {
            'required': 'Purchase User ID is required.'
        },
        'purchase_id': {
            'required': 'Purchase ID is required.'
        },
        'product_id': {
            'required': 'Product is required.'
        },
        'total_no_eins': {
            'required': 'Total No. of EIN\'s is required.',
            'min': 'EIN count should be greater than the current value of 0',
            'minValue': 'Total No. of EIN\'s should be greater than 0',
            'maxValue': 'Total No. of EIN\'s should be less than or equal to 15'
        },
        'total_no_forms': {
            'required': 'Total No. of Form\'s is required.'
        },
        'purchaser_first_name': {
            'required': 'Purchaser First Name is required.',
            'minlength': 'Purchaser First Name should be a minimum 2 chars.',
        },
        'purchaser_last_name': {
            'required': 'Purchaser Last Name is required.',
            'minlength': 'Purchaser Last Name should be a minimum 2 chars.',
        },
        'purchaser_email': {
            'required': 'Purchaser Email is required.',
            'pattern': 'Valid Purchaser Email is required.',
        },
        'purchaser_mobile': {
            'required': 'Purchaser Phone is required.',
            'minlength': 'Phone should be 10 digit length.'
        },
        'purchase_status': {
            'required': 'Purchased Status is required.'
        },
        'amount': {
            'required': 'Amount is required.',
            'pattern': 'Valid Amount is required.',
        },
        'account_manager': {
            'required': 'Account Manager is required.'
        },
        'purchase_date': {
            'required': 'Purchased Date is required.'
        },
        'is_invoice': {
            'required': 'Invoice is required.'
        },
        'invoice_no': {
            'required': 'Invoice No. is required.',
            'maxlength': 'Invoice No. should be a maximum 30 chars.'
        },
        'invoice_created_at': {
            'required': 'Invoice Date is required.'
        },
        'is_invoice_paid': {
            'required': 'Invoice Paid is required.'
        }
    };

    /*To close a modal with confirmation*/
    public okClose() {
        this.tempModal.hide();
        this.closeConfirmationModal.hide();
        this._resetFormValues(this.formToReset);
        this.tempModal = '';
    }

    /*To delete a particular Brand*/
    public removePurchase(item) {
        this.purchaseSelected = item;
        this.deleteModal.show();
    }

    public okDelete() {
        this.deleteModal.hide();
        let item = this.purchaseSelected;
        //Scenario 1 : Purchase is new. No dependencies are there so can be deleted directly
        if (item.hasOwnProperty('is_new_purchase') && item.is_new_purchase == 1) {
            var newIndex = this.newPurchases.indexOf(item);
            if (newIndex !== -1) {
                this.newPurchases.splice(newIndex, 1);
            }

            var totalIndex = this.totalPurchases.indexOf(item);
            if (totalIndex !== -1) {
                this.totalPurchases.splice(totalIndex, 1);
            }

            //updating the orders with selectable products
            this.orders = this.getOrders();

            //Scenario 2 : Purchase is Old
            //  }else if(item.hasOwnProperty('is_new_purchase') && item.is_new_purchase == 0){
        } else {
            //Scenario 2-1 : Checking for dependencies
            //if has dependencies show error
            if (item.is_primary_contact || item.is_billing_contact || item.is_agreement_signed) {
                this.toastrService.error("Purchase cannot be removed as it has dependencies");
            } else {
                //remove the purchase from the db as well as from client end.

                if (item.purchase_id !== '') {
                    this.ordersService.deletePurchase(item.purchase_id).subscribe(
                        result => {
                            if (result.success) {

                                if (result.data.flag == "Client Deleted") {
                                    this.askConfirm = false;
                                    this.closeModal('updateClientModal');
                                    this.orders = this.getOrders();
                                    this.toastrService.success('Purchase deleted with Client succesfully.');
                                } else if (result.data.flag == "Purchase Deleted") {

                                    var newIndex = this.updatePurchases.indexOf(item);
                                    if (newIndex !== -1) {
                                        this.updatePurchases.splice(newIndex, 1);
                                    }

                                    var totalIndex = this.totalPurchases.indexOf(item);
                                    if (totalIndex !== -1) {
                                        this.totalPurchases.splice(totalIndex, 1);
                                    }
                                    //updating the orders with selectable products
                                    this.orders = this.getOrders();

                                    this.toastrService.success('Purchase deleted succesfully.');
                                } else {
                                    this.toastrService.success('Trouble in removing the purchase. Please try later.');
                                }
                                this.purchaseSelected = '';
                            } else {
                                this.toastrService.error('Trouble in removing the purchase. Please try later.');
                            }
                        },
                        error => {
                            if (error.status == 422) {
                                let errorFields = JSON.parse(error.data.message);
                                this.toastrService.error('Trouble in removing the purchase. Please try later.');
                                //   this._setFormErrors(this._addClientFormErrors, errorFields);
                            } else {
                                //this._errorMessage = error.data;
                                this.toastrService.error('Trouble in removing the purchase. Please try later.');
                            }
                        });
                }
            }
        }
    }
    /**
     * 
     * @param max 
     */
    public minValue(max: Number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const input = control.value,
                isValid = input < max;
            if (isValid)
                return { 'minValue': { max } }
            else
                return null;
        };
    }

    /**
     * 
     * @param max 
     */
    public maxValue(max: Number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const input = control.value,
                isValid = input > max;
            if (isValid)
                return { 'maxValue': { max } }
            else
                return null;
        };
    }
    /**
     * 
     * @param phoneNumber 
     */
    formatPhoneNumber(phoneNumber) {
        if (phoneNumber) {
            phoneNumber = phoneNumber.replace(/[`()|\-\/\ ]/gi, '');
            return '(' + phoneNumber.slice(0, 3) + ') ' + '' + phoneNumber.slice(3, 6) + '-' + phoneNumber.slice(6, 10)
        }
        return '';
    }
}
