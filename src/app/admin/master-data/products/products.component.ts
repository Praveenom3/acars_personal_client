import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from "app/_services/_global.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ProductsService } from "app/_services/_products.service";
import { Http } from "@angular/http";
import { ModalDirective } from "ngx-bootstrap";
import { Products } from "app/_models/products";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    productIDSelected: any;
    etype: Products;
    data: Products[];

    @ViewChild('ProductsModal') public ProductsModal: ModalDirective;
    @ViewChild('deleteModal') public deleteModal: ModalDirective;

    public filterQuery = "";
    public rowsOnPage = 5;
    public sortOrder = "";
    public sortBy = "";

    public productSelected: Products;
    public products: Products[];

    private _formErrors: any;
    private _errorMessage: string;
    private modalTitle: string;
    private _submitted: boolean;

    public base64textString: string;

    public _productForm: FormGroup;

    public years = [];
    public productTypes: any[] = [];

    constructor(private _globalService: GlobalService,
        private _formBuilder: FormBuilder,
        private productsService: ProductsService,
        private toastrService: ToastrService,
        private _http: Http) {
        this.productTypes = this._globalService.productTypes;
        this.years = this._globalService.years;
        this._productForm = _formBuilder.group({
            product_name: ['', Validators.compose([Validators.required])],
            applicable_year: ['', Validators.compose([Validators.required])],
            account_manager: ['', Validators.compose([Validators.required])],
            product_type: ['', Validators.compose([Validators.required])]
        });

        this._productForm.valueChanges
            .subscribe(productData => this.onValueChanged(productData));
    }

    /*calls when page on load*/
    ngOnInit() {
        this.getProducts();
        this.productSelected = this.createNewProduct();
        this._resetFormErrors();

    }

    public validationMessages = {
        'product_name': {
            'required': 'Product Name is required.'
        },
        'applicable_year': {
            'required': 'Applicable Year is required.'
        },
        'account_manager': {
            'required': 'Account Manager is required.',
        },
        'product_type': {
            'required': 'Product Type is required.',
        }
    };

    createNewProduct() {
        // Create a new Product
        let newProduct: Products = {
            product_id: 0,
            product_name: '',
            product_type: null,
            account_manager: '',
            applicable_year: null,
            created_by: '',
            created_at: '',
            updated_at: '',
            updated_by: '',
            is_deleted: ''
        }
        return newProduct;
    }

    // Calls when the add product buton is pressed
    newProduct() {
        this.productSelected = this.createNewProduct();   // Set productSelected to a new Product
        this.base64textString = '';
        this._submitted = false;
        this.modalTitle = "Add Product";
        this.ProductsModal.show();       // Open the Popup  
    }


    /*getting products from service*/
    private getProducts() {
        this.productsService.getProducts()
            .subscribe((products) => {
                this.products = products;
            },
            error => { this._errorMessage = error.data }
            );
    }

    public accountManagerStatus(product) {
        this.productsService.accountManagerStatus(product).subscribe(
            result => {
                if (result.success) {
                    this.getProducts();
                    this.toastrService.success('Account Manager Required Status Updated Succesfully.');
                } else {
                    this._errorMessage = 'Status not Updated.';
                }
            },
            error => {
                this._errorMessage = error.data;
            });
    }

    /*To delete a particular product*/
    public deleteProduct(product) {
        this.productIDSelected = product.product_id;
        this.deleteModal.show();
    }

    public okDelete() {
        this.productsService.deleteProduct(this.productIDSelected)
            .subscribe(() => {
                this.getProducts();
                this.toastrService.success('Product Deleted Succesfully .');
                this.deleteModal.hide();
            },
            error => {
                this._errorMessage = error.data;
                this.toastrService.error(error.data.message);
            });

    }

    /*updating product*/
    public updateProduct(product: Products) {
        this.productSelected = Object.assign({}, product);
        this.base64textString = '';
        this._submitted = false;
        this.modalTitle = "Edit Product";
        this.ProductsModal.show();
    }

    public closeModal() {
        this._productForm.reset();
        this._resetFormErrors();
        this.ProductsModal.hide();
    }
    /*on submit sending form data to service.It is for both add and update*/
    public onSubmit() {
        this._submitted = true;
        if (this.productSelected.product_id > 0) {
            this.productsService.updateProduct(this.productSelected).subscribe(
                result => {
                    if (result.success) {
                        this.getProducts();
                        this.closeModal();
                        this.toastrService.success('Product Updated Successfully.');
                    } else {
                        this._errorMessage = 'Record not Updated';
                        this._submitted = false;
                    }
                },
                error => {
                    this._submitted = false;
                    // Validation error
                    if (error.status == 422) {
                        this._resetFormErrors();
                        let errorFields = JSON.parse(error.data.message);
                        this._setFormErrors(errorFields);
                    } else {
                        this._errorMessage = error.data;
                    }
                });

        } else {

            this.productsService.addProduct(this.productSelected).subscribe(
                result => {
                    if (result.success) {
                        this.getProducts();
                        this.closeModal();
                        this.toastrService.success('Product Added Succesfully.');
                    } else {
                        this._errorMessage = 'Record not added.';
                        this._submitted = false;
                    }
                },
                error => {
                    this._submitted = false;
                    if (error.status == 422) {
                        this._resetFormErrors();
                        let errorFields = JSON.parse(error.data.message);
                        this._setFormErrors(errorFields);
                    } else {
                        this._errorMessage = error.data;
                    }
                });
        }
    }


    private _resetFormErrors(): void {
        this._formErrors = {
            product_name: { valid: true, message: '' },
            product_type: { valid: true, message: '' },
            applicable_year: { valid: true, message: '' },
            account_manager: { valid: true, message: '' }
        };

    }

    private _setFormErrors(errorFields: any): void {
        for (let key in errorFields) {
            // skip loop if the property is from prototype
            if (!errorFields.hasOwnProperty(key)) continue;
            let message = errorFields[key];
            this._formErrors[key].valid = false;
            this._formErrors[key].message = message;
        }
    }

    private _isValid(field): boolean {
        let isValid: boolean = false;

        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if (this._productForm.controls[field].touched == false) {
            isValid = true;

        }
        // If the field is touched and valid value, then it is considered as valid.
        else if (this._productForm.controls[field].touched == true && this._productForm.controls[field].valid == true) {
            isValid = true;

        } else if (this._productForm.controls[field].touched == true && this._productForm.controls[field].valid == false) {
            let control = this._productForm.get(field);
            const messages = this.validationMessages[field];

            this._formErrors[field].valid = false;
            for (const key in control.errors) {
                this._formErrors[field].message = messages[key];
            }
            isValid = false;
        }
        return isValid;
    }


    public onValueChanged(data?: any) {
        if (!this._productForm) { return; }
        const form = this._productForm;
        for (let field in this._formErrors) {
            // clear previous error message (if any)
            let control = form.get(field);
            if (control && control.dirty) {
                this._formErrors[field].valid = true;
                this._formErrors[field].message = '';
            }

        }
    }


}
