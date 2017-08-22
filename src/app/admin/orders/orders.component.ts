import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OrdersService } from "app/_services/_orders.service";
import { ToastrService } from "ngx-toastr";
import { Clients } from "app/_models/clients";
import { Brands } from "app/_models/brands";
import { ModalDirective } from "ngx-bootstrap";
import { NumberValidationService } from "app/_services/_number-validation.service";
import * as Globals from 'app/_shared/_globals';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    public temp_arr=[];
    tempAvailableProducts: any;

    _addClientFormSubmitted = false;
    _addPurchaseFormSubmitted = false;
    _updateClientFormSubmitted = false;
    _updatePurchaseFormSubmitted = false;

    @ViewChild('addClientModal') public addClientModal: ModalDirective;
    @ViewChild('updateClientModal') public updateClientModal: ModalDirective;
    @ViewChild('addPurchaseModal') public addPurchaseModal: ModalDirective;
    @ViewChild('updatePurchaseModal') public updatePurchaseModal: ModalDirective;

    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

    public temp_brand_id = '';
    public temp_brand = '';
    public temp_client_name = '';
    public temp_client_number = '';
    public temp_index = -1;
    public show_account_manager = 0;

    public orders;
    public clientsTableData;
    maxClientNumber: any;
    availableProducts: any;
    selectableProducts: any[];
    public availableBrands: Brands[];
    public availableAcctManagers: any[];
    public totalPurchases=[];
    public newPurchases=[];
    public updatePurchases=[];
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
        private _formBuilder: FormBuilder,
        private ordersService: OrdersService,
        private toastrService: ToastrService) {

       this._addClientForm = _formBuilder.group({
            client_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            brand_id: ['', Validators.compose([Validators.required])],
            client_number: ['']
        });

        this._updateClientForm = _formBuilder.group({
            client_id:[''],
            client_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            brand_id: ['', Validators.compose([Validators.required])],
            client_number: ['']
        });

        this._addPurchaseForm = _formBuilder.group({
            product_id: ['', Validators.compose([Validators.required])],
            total_no_eins: ['', Validators.compose([Validators.required, Validators.maxLength(3)])],
            total_no_forms: ['', Validators.compose([Validators.maxLength(6)])],   
            purchaser_first_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            purchaser_last_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            purchaser_email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
            purchaser_mobile: ['', Validators.compose([Validators.required])],
            purchase_status: [''],
            amount: ['', Validators.compose([Validators.pattern(/^\s*([1-9]+)\d*(?:\.\d{1,2})?\s*$/)])],
            account_manager: [''],
            purchase_date: [''],
            is_invoice: ['', Validators.compose([Validators.required])],            
            invoice_no: [''],
            invoice_created_at: [''],
            is_invoice_paid: ['0']
        });
        
        this._updatePurchaseForm = _formBuilder.group({
            purchase_user_id:[''],
            purchase_id:[''],
            product_id: ['', Validators.compose([Validators.required])],
            total_no_eins: ['', Validators.compose([Validators.required, Validators.maxLength(3)])],
            total_no_forms: ['', Validators.compose([Validators.maxLength(6)])],      
            purchaser_first_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            purchaser_last_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            purchaser_email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
            purchaser_mobile: ['', Validators.compose([Validators.required])],
            purchase_status: [''],
            amount: ['', Validators.compose([Validators.pattern(/^\s*([1-9]+)\d*(?:\.\d{1,2})?\s*$/)])],
            account_manager: [''],
            purchase_date: [''],
            is_invoice: ['', Validators.compose([Validators.required])],            
            invoice_no: [''],
            invoice_created_at: [''],
            is_invoice_paid: ['0']
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
        this.orders = this.getOrders();
        this._resetFormErrors();
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

    public getSelectableProducts(client_id?, product_id?, mode?){

        if(mode == 'clientAddPurchase'){
            //before submit
            //for the update client scenario
            if(client_id){
                //getting the purchases already saved in the db and assigning is_deleted to 1
                this.clientsTableData.forEach(clientElement => {
                    if(clientElement.client_id == client_id){
                        clientElement.clientPurchases.forEach(purchaseElement => {
                            let product_name = this.getItemName('product', purchaseElement.product_id);
                            
                            this.selectableProducts.forEach((selectableProductElement, index) => {
                                Globals.products_keywords.forEach(product_key => {
                                    if(product_name.indexOf(product_key) !== -1){
                                        if(selectableProductElement.product_name.indexOf(product_key) !== -1){
                                            this.selectableProducts[index].is_deleted=1;
                                        }
                                    }
                                });
                            });
                        });
                    }
                });
            }
            
            //returning the already made purchases is_deleted status to 1 which have been toggled in the update purchase scenario
            if(this.temp_arr){
                this.temp_arr.forEach(tempArrElement => {
                    this.selectableProducts.forEach((selectableProductElement, index) => {
                        if(selectableProductElement.product_name == tempArrElement.product_name){
                            this.selectableProducts[index].is_deleted=1;
                        }
                    });
                });
                this.temp_arr = [];
            }

            //after submit
            if(product_id){
                let product_name = this.getItemName('product', product_id); 
    
                this.selectableProducts.forEach((selectableProductElement, index) => {
                    Globals.products_keywords.forEach(product_key => {                    
                        if(product_name.indexOf(product_key) !== -1){
                            if(selectableProductElement.product_name.indexOf(product_key) !== -1){
                                this.selectableProducts[index].is_deleted=1;
                            }
                        }
                    });                
                });
            }

        }else if(mode == 'clientUpdatePurchaseBeforeSubmit'){

            //returning the already made purchases is_deleted status to 1 which have been toggled in the update purchase scenario
            if(this.temp_arr){
                this.temp_arr.forEach(tempArrElement => {
                    this.selectableProducts.forEach((selectableProductElement, index) => {
                        if(selectableProductElement.product_name == tempArrElement.product_name){
                            this.selectableProducts[index].is_deleted=1;
                        }
                    });
                });
                this.temp_arr = [];
            }
            
            //get all selectable products from available
            if(product_id){
                let product_name = this.getItemName('product', product_id); 
                
                Globals.products_keywords.forEach(product_key => {     
                    if(product_name.indexOf(product_key) !== -1){
                        this.availableProducts.forEach((availableProductElement, index) => {
                            if(availableProductElement.product_name.indexOf(product_key) !== -1){
                                if(availableProductElement.is_deleted == 0 ){
                                    this.temp_arr.push(this.availableProducts[index]);
                                    this.selectableProducts[index].is_deleted = 0;
                                }
                            }
                        });
                    }
                });
            }

        }else if(mode == 'clientUpdatePurchaseAfterSubmit'){

            if(product_id){
                let product_name = this.getItemName('product', product_id); 
                
                //if product_id exists in previously selected products package
                Globals.products_keywords.forEach(product_key => {     
                    if(product_name.indexOf(product_key) !== -1){
                        this.availableProducts.forEach((availableProductElement, index) => {
                            if(availableProductElement.product_name.indexOf(product_key) !== -1){
                                this.selectableProducts[index].is_deleted = 1;
                            }
                        });
                    }
                });
            }
            this.temp_arr = [];
        }else{
            //getting all the available products.. This stmt alone can be used in the freshly adding client scenario also
            this.selectableProducts = JSON.parse(JSON.stringify(this.availableProducts));
            this.temp_arr = [];
        }
    }

    public toggleInvoiceFieldsValidator(form, status){
         if(status==true){
            
        form.controls['invoice_no'].setValidators(Validators.compose([Validators.required]));
        form.controls['invoice_created_at'].setValidators(Validators.compose([Validators.required]));
        form.controls['is_invoice_paid'].setValidators(Validators.compose([Validators.required]));

        form.controls['invoice_no'].updateValueAndValidity();
        form.controls['invoice_created_at'].updateValueAndValidity();
        form.controls['is_invoice_paid'].updateValueAndValidity();
        
        }else{
        form.controls['invoice_no'].setValidators(null);
        form.controls['invoice_created_at'].setValidators(null);
        form.controls['is_invoice_paid'].setValidators(null);

        form.controls['invoice_no'].updateValueAndValidity();
        form.controls['invoice_created_at'].updateValueAndValidity();
        form.controls['is_invoice_paid'].updateValueAndValidity();

        }
    }


    public openModal(modal, data?: any)
    {
        this._errorMessage = '';

        if(modal=='addClientModal'){
            this._addClientFormSubmitted = false;

            this.totalPurchases = [];
            this.newPurchases = [];
            this.getSelectableProducts();

            this.addClientModal.show();

        }else if(modal=='updateClientModal'){

            this._updateClientFormSubmitted = false;

            this.totalPurchases = [];
            this.newPurchases = [];

            this.patchValue(this._updateClientForm, data);

            data.clientPurchaseUsers.forEach(purchaseUser => {
                data.clientPurchases.forEach(purchase => {
                    if(purchaseUser.purchase_id == purchase.purchase_id){
                        var obj = Object.assign(purchaseUser,purchase);
                        this.totalPurchases.push(obj);
                    }
                });
            });

            this.getSelectableProducts();

            this.temp_brand = this.getItemName('brand',this._updateClientForm.value.brand_id);
            this.temp_client_number = this._updateClientForm.value.client_number;

            this.updateClientModal.show();
        }else if(modal=='addPurchaseModal'){

            if(this._updateClientForm.value.client_id){
                this.getSelectableProducts(this._updateClientForm.value.client_id, '', 'clientAddPurchase');
            }else{
                this.getSelectableProducts('', '', 'clientAddPurchase');
            }

            this._addPurchaseFormSubmitted = false;

            this.addPurchaseModal.show();

        }else if(modal=='updatePurchaseModal'){

            this._updatePurchaseFormSubmitted = false;

            this.temp_index = this.totalPurchases.indexOf(data);
            this.patchValue(this._updatePurchaseForm, data);

            this._updatePurchaseForm.controls['total_no_eins'].setValidators(Validators.compose([Validators.required, NumberValidationService.min(this._updatePurchaseForm.value.total_no_eins), Validators.maxLength(3)]));
            this._updatePurchaseForm.controls['total_no_eins'].updateValueAndValidity();

            if(this._updateClientForm.value.client_id){
                this.getSelectableProducts('', this._updatePurchaseForm.value.product_id, 'clientUpdatePurchaseBeforeSubmit');
            }else{
                this.getSelectableProducts(this._updateClientForm.value.client_id, '', 'clientAddPurchase');
                this.getSelectableProducts('', this._updatePurchaseForm.value.product_id, 'clientUpdatePurchaseBeforeSubmit');
            }
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

    public closeModal(modal)
    {
        if(modal=='addClientModal'){

            this.addClientModal.hide();
            this._resetFormValues(this._addClientForm);
        }else if(modal=='updateClientModal'){

            this.updateClientModal.hide();
            this._resetFormValues(this._updateClientForm);

        }else if(modal=='addPurchaseModal'){
            this.addPurchaseModal.hide();
            this._resetFormValues(this._addPurchaseForm);

        }else if(modal=='updatePurchaseModal'){

            this.updatePurchaseModal.hide();
            this._resetFormValues(this._updatePurchaseForm);
        }
        this._resetFormErrors();
    }

    public getItemName(item_type, item_value){
        
        if(item_type == 'product'){

            for (var i = 0; i < this.availableProducts.length; i++) {
                if(this.availableProducts[i].product_id == item_value){
                    return this.availableProducts[i].product_name;
                }
            }
        }else if(item_type == 'brand'){
            for (var i = 0; i < this.availableBrands.length; i++) {
                if(this.availableBrands[i].brand_id == item_value){
                    return this.availableBrands[i].brand_name;
                }
            }
        }
        return "NA";
    }

    public onSubmit(form){
        if(form==this._addClientForm){

            if(this._addClientForm.value.brand_id.hasOwnProperty('brand_id')){
                this._addClientForm.value.brand_id = this._addClientForm.value.brand_id.brand_id;
            }
            
            this._addClientForm.value.client_number = this.temp_client_number;
            
            let data = {
                "Clients": this._addClientForm.value,
                "purchases": this.newPurchases
            };

            this._addClientFormSubmitted = true;

            this.ordersService.createClientsAndPurchases(data).subscribe(
                result => {
                    if (result.success) {
                        this.orders = this.getOrders();
                        this.closeModal('addClientModal');
                        this.toastrService.success('Client and Purchases Added Succesfully.');
                    } else {
                        this.toastrService.error('Trouble adding the client. Please try later.');
                        this._addClientFormSubmitted = false;
                    }
                },
                error => {
                    this._addClientFormSubmitted = false;
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

        }else if(form==this._updateClientForm){

            if(this._updateClientForm.value.brand_id.hasOwnProperty('brand_id')){
                this._updateClientForm.value.brand_id = this._updateClientForm.value.brand_id.brand_id;
            }
            
            let allPurchases = [];
            if(this.newPurchases.length > 0){
                allPurchases = this.newPurchases;
            }
            if(this.updatePurchases.length > 0){
                allPurchases = allPurchases.concat(this.updatePurchases);
            }
            
            this.updatePurchases = [];

            let data = {
                "Clients": this._updateClientForm.value,
                "purchases": allPurchases
            };
            
            this._updateClientFormSubmitted = true;

            this.ordersService.updateClientAndCreateNewPurchases(data).subscribe(
                result => {
                    if (result.success) {                        
                        this.orders = this.getOrders();
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
                        let errorFields = JSON.parse(error.data.message);
                       this.toastrService.error('Trouble in updating client. Please try later.');
                     //   this._setFormErrors(this._addClientFormErrors, errorFields);
                    } else {
                        //this._errorMessage = error.data;
                        this.toastrService.error('Trouble in updating client. Please try later.');
                    }
                });

        }else if(form==this._addPurchaseForm){
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

        }else if(form==this._updatePurchaseForm){
            this.updatePurchases = [];
            //removing spl chars from purchaser mobile
            form.value.purchaser_mobile = form.value.purchaser_mobile.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\ ]/gi, '');
            
            if (this.temp_index !== -1) {
                this.totalPurchases[this.temp_index] = form.value;
            }
            //resetting temp_index value
            this.temp_index = -1;

            this.updatePurchases.push(form.value);
            
            this.getSelectableProducts('', form.value.product_id, 'clientUpdatePurchaseAfterSubmit');

            this.closeModal('updatePurchaseModal');

        }
    }

    public onBrandChange(form, value){
        if(form == this._addClientForm){
            if(value && value.hasOwnProperty('brand_name')){
            this.temp_brand = value.brand_name;

            this.temp_client_number = this.temp_brand.substring(0, 3) + '-' + this.maxClientNumber;
            }else{
                this.temp_client_number = '';
                this.temp_brand = '';
            }
        }else if(form == this._updateClientForm){
            
            if(value && value.hasOwnProperty('brand_name')){
                this.temp_brand = value.brand_name;
                }else{
                    this.temp_brand = '';
                }
        }
    }

    public onProductChange(form, value){
        this.show_account_manager = 0;
        if(value){
            for (var i = 0; i < this.availableProducts.length; i++) {
                if(this.availableProducts[i].product_id == value){
                    this.show_account_manager = this.availableProducts[i].account_manager;
                }
            }
        }

        if(this.show_account_manager == 1){
            form.controls['is_invoice_paid'].setValidators(Validators.compose([Validators.required]));
            form.controls['invoice_no'].updateValueAndValidity();
        }else{
            form.controls['is_invoice_paid'].setValidators(null);
            form.controls['invoice_no'].updateValueAndValidity();
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

    removePurchase(item) {
        var newIndex = this.newPurchases.indexOf(item);
        if (newIndex !== -1) {
            this.newPurchases.splice(newIndex, 1);
        }
        
        var totalIndex = this.totalPurchases.indexOf(item);
        if (totalIndex !== -1) {
            this.newPurchases.splice(totalIndex, 1);
        }       
    }
        
    private _resetFormValues(form):void{
        form.reset();
        if(form == this._addPurchaseForm || form == this._updatePurchaseForm){
            form.controls.product_id.setValue('');
            form.controls.purchase_status.setValue('');
            form.controls.is_invoice.setValue('');
            form.controls.is_invoice_paid.setValue('0');
            form.controls.account_manager.setValue('');
        }

        if(form == this._addClientForm || form == this._updateClientForm){
        form.controls.brand_id.setValue('');
        this.temp_client_number = '';
        this.temp_brand = '';
        this.temp_index = -1;
        }
    }

    private _resetFormErrors(): void {
        this._addClientFormErrors = {
            client_name: { valid: true, message: '' },
            brand_id: { valid: true, message: '' },
            client_number: { valid: true, message: '' }
        };


        this._updateClientFormErrors = {
            client_id:{ valid: true, message: '' },
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
            purchase_user_id:{ valid: true, message: '' },
            purchase_id:{ valid: true, message: '' },
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
            'required': 'Brand ID is required.'
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
            'required': 'Product ID is required.'
        },
        'total_no_eins': {
            'required': 'Total No. of EIN\'s is required.',
            'min': 'Min value can\'t be less than already provided value'
        },
        'total_no_forms': {
            'required': 'Total No. of Form\'s is required.'
        },
        'purchaser_first_name': {
            'required': 'Purchaser First Name is required.',
            'minlength': 'Purchaser First Name should be a minimum 3 chars.',
        },
        'purchaser_last_name': {
            'required': 'Purchaser Last Name is required.',
            'minlength': 'Purchaser Last Name should be a minimum 3 chars.',
        },
        'purchaser_email': {
            'required': 'Purchaser Email is required.',
            'pattern': 'Valid Purchaser Email is required.',
        },
        'purchaser_mobile': {
            'required': 'Purchaser Mobile is required.'
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
            'required': 'Invoice No. is required.'
        },
        'invoice_created_at': {
            'required': 'Invoice Date is required.'
        },
        'is_invoice_paid': {
            'required': 'Invoice Paid is required.'
        }
    };
}
