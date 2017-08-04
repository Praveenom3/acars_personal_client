import {
    Component, OnInit, OnDestroy, Input, Output,
    ViewContainerRef, EventEmitter, ViewChild, trigger, AfterViewInit
} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { BrandsService } from "app/_services/_brands.service";
import { ModalDirective } from "ngx-bootstrap";
import { Brands } from "app/_models/brands";
import { ToastrService } from "ngx-toastr";
import { GlobalService } from "app/_services/_global.service";
import { Http, Headers, Response } from '@angular/http';

@Component({
    moduleId: module.id,
    selector: 'app-master-data',
    templateUrl: './master-data.component.html'
})


export class MasterDataComponent implements OnInit {

    data: Brands[];

    @ViewChild('BrandsModal') public BrandsModal: ModalDirective;
    @ViewChild('brandLogo') public brandLogoVariable: any;

    // public myModel = ''
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

    public base64textString: string;
    public files: any;
    // public emptybrand: any;
    // public  data: Brands[];

    public brandSelected: Brands;
    public brands: Brands[];

    // public currentBrand:any;
    public modalTitle: string = "Add Brand";

    private _addBrandForm: FormGroup;
    private _formErrors: any;
    private _submitted: boolean = false;
    private _errorMessage: string = '';

    public brandImgPath = this._globalService.apiRoot + '/images/uploads/brands/';

    public filterQuery = "";
    public rowsOnPage = 10;
    public sortOrder = "";
    public sortBy = "";

    constructor(private _globalService: GlobalService,
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private brandsService: BrandsService,
        private toastrService: ToastrService,
        private http: Http) {
    


        this._addBrandForm = _formBuilder.group({
            brand_name: ['', Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z0-9& -]+$/)])],
            support_email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
            support_phone: ['', Validators.compose([Validators.required])],
            terms_conditions_url: ['', Validators.compose([Validators.required])],
            brand_logo: ['', Validators.compose([])],
            brand_status: ['', Validators.compose([Validators.required])]
        });

        this._addBrandForm.valueChanges
            .subscribe(brandData => this.onValueChanged(brandData));
    }


    /*calls when page on load*/
    ngOnInit() {
        this.brandsList();
        this.brandSelected = this.createNewBrand();
        this._resetFormErrors();
    }

    public validationMessages = {
        'brand_name': {
            'required': 'Brand is required.',
            'pattern':'No special characters are allowed.'
        },
        'support_email': {
            'required': 'Support Email is required.',
            'pattern': 'Support Email is invalid'
        },
        'support_phone': {
            'required': 'Phone is required.',
        },
        'brand_logo': {
            'required': 'Logo is required.',
        },
        'terms_conditions_url': {
            'required': 'URL is required.'
        },
        'brand_status': {
            'required': 'Brand status id required.',
        },
    };


    createNewBrand() {
        // Create a new Brand
        let newBrand: Brands = {
            brand_id: 0,
            brand_name: '',
            support_email: '',
            support_phone: '',
            terms_conditions_url: '',
            brand_logo: '',
            brand_status: '',
            created_by: '',
            created_at: '',
            updated_at: '',
            updated_by: '',
            is_deleted: '',
        }
        return newBrand;
    }

    // Calls when the Add Brand buton is pressed
    newBrand() {
        this.brandLogoVariable.nativeElement.value = "";
        this.brandSelected = this.createNewBrand();   // Set brandSelected to a new Product
        this.base64textString = '';
        this._submitted = false;
        this.modalTitle = "Add Brand";
        this.BrandsModal.show();       // Open the Popup  
    }


    /*getting brands from service*/
    private brandsList() {
        this.brandsService.getBrands()
            .subscribe((brands) => {
                this.brands = brands;
            },
            error => { this._errorMessage = error.data }
            );
    }

    public statusChange(brand) {
        this.brandsService.statusChange(brand).subscribe(
            result => {
                if (result.success) {
                    this.brandsList();
                    this.toastrService.success('Status Updated Succesfully.');
                } else {
                    this._errorMessage = 'Status not Updated.';
                }
            },
            error => {
                this._errorMessage = error.data;
            });
    }

    /*To delete a particular brand*/
    public deleteBrand(brand) {
        if (confirm("Are you sure want to delete this brand?")) {
            this.brandsService.deleteBrand(brand.brand_id)
                .subscribe(() => {
                    this.brandsList();
                    this.toastrService.success('Brand Deleted Succesfully .');
                },
                error => {
                    this._errorMessage = error.data;
                });
        }
    }

    /*updating brand*/
    public updateBrand(brand: Brands) {
        
        this.brandSelected = Object.assign({}, brand);
        this.base64textString = '';
        this._submitted = false;
        this.brandLogoVariable.nativeElement.value = "";
        this.modalTitle = "Edit Brand";
        this.BrandsModal.show();
    }

public closeModal()
{
        this._addBrandForm.reset();
        this._resetFormErrors();
        this.BrandsModal.hide();
}
    /*on submit sending form data to service.It is for both add and update*/
    public onSubmit() {
        this._submitted = true;
        if (this.brandSelected.brand_id > 0) {

            this.brandSelected.brand_logo = this.base64textString;
            this.brandsService.updateBrand(this.brandSelected).subscribe(
                result => {
                    if (result.success) {
                        this.closeModal();
                        this.brandsList();
                        this.toastrService.success('Brand Updated Successfully.');
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
                        // this._errorMessage = "There was an error on submission. Please check again.";
                        let errorFields = JSON.parse(error.data.message);
                        this._setFormErrors(errorFields);
                    } else {
                        this._errorMessage = error.data;
                    }
                });

        } else {

            this.brandSelected.brand_logo = this.base64textString;
            this.brandsService.addBrand(this.brandSelected).subscribe(
                result => {
                    if (result.success) {
                        this.brandsList();
                         this.closeModal();
                        this.toastrService.success('Brand Added Succesfully.');
                    } else {
                        this._errorMessage = 'Record not added.';
                        this._submitted = false;
                    }
                },
                error => {
                    this._submitted = false;
                    // Validation error
                    if (error.status == 422) {
                        this._resetFormErrors();
                        // this._errorMessage = "There was an error on submission. Please check again.";
                        let errorFields = JSON.parse(error.data.message);
                        this._setFormErrors(errorFields);
                    } else {
                        this._errorMessage = error.data;
                    }
                });
        }
    }


    /*when file is selected to upload then it converts file to base64 string*/
    private handleFileSelect(evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = this._handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
        else {
            this.base64textString = '';
        }
    }



    private _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.base64textString = btoa(binaryString);
    }


    /*---base64 encode End ---*/

    private _resetFormErrors(): void {
        this._formErrors = {
            brand_name: { valid: true, message: '' },
            support_email: { valid: true, message: '' },
            support_phone: { valid: true, message: '' },
            terms_conditions_url: { valid: true, message: '' },
            brand_logo: { valid: true, message: '' },
            brand_status: { valid: true, message: '' },
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
        if (this._addBrandForm.controls[field].touched == false) {
            isValid = true;

        }
        // If the field is touched and valid value, then it is considered as valid.
        else if (this._addBrandForm.controls[field].touched == true && this._addBrandForm.controls[field].valid == true) {
            isValid = true;

        } else if (this._addBrandForm.controls[field].touched == true && this._addBrandForm.controls[field].valid == false) {
            let control = this._addBrandForm.get(field);

            const messages = this.validationMessages[field];

            this._formErrors[field].valid = false;
            for (const key in control.errors) {
                this._formErrors[field].message = messages[key];
                // this._formErrors[field] += messages[key] + ' ';
            }
            isValid = false;
        }
        return isValid;
    }


    public onValueChanged(data?: any) {
        if (!this._addBrandForm) { return; }
        const form = this._addBrandForm;
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

