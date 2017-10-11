import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AuthenticationService } from '../../_services/_authentication.service';
import { ValidationService } from "../../_services/_validation.service";
import { ModalDirective } from "ngx-bootstrap";
import { ToastrService } from "ngx-toastr";
import { IdleTimeoutService } from "app/_services/_idle-timeout.service";

import * as Globals from '../../_shared/_globals';
import { GlobalService } from "app/_services/_global.service";
import { LoaderService } from "app/interceptors/loader.service";
declare var $: any;

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent implements OnInit {

    @ViewChild('chngPwdModal') public chngPwdModal: ModalDirective;

    isMenuActive: boolean = false;
    isLinkActive: boolean = false;

    private chngPwdForm: FormGroup;
    private _formErrors: any;
    private _submitted: boolean = false;
    private _errorMessageChngPwd: string = '';

    public useremail: string;
    public userFirstName: string;
    public userLastName: string;

    //ToggleClass function functionality
    toggleClass() {
        this.isMenuActive = !this.isMenuActive;
        this.isLinkActive = !this.isLinkActive;
    }

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastrService: ToastrService,
        private _idleTimeout: IdleTimeoutService,
        private globalService: GlobalService,
        public loaderService: LoaderService
    ) {
        _idleTimeout.init();

        this.useremail = localStorage.getItem('useremail');
        this.userFirstName = localStorage.getItem('firstName');
        this.userFirstName = (this.userFirstName === 'undefined') ? '' : this.userFirstName;
        this.userLastName = localStorage.getItem('lastName');
        this.userLastName = (this.userLastName != 'undefined') ? this.userLastName : '';

        this.chngPwdForm = this.formBuilder.group({
            'currentPassword': ['', Validators.required],
            'newPassword': ['', [Validators.required, Validators.minLength(6)]],
            'retypePassword': ['', Validators.required]

        });

        this.chngPwdForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.globalService.getPermissions();
    }

    ngOnInit() {
        this._resetFormErrors();
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

    private _resetFormErrors(): void {
        this._formErrors = {
            currentPassword: { valid: true, message: '' },
            newPassword: { valid: true, message: '' },
            retypePassword: { valid: true, message: '' },
        };

        this._errorMessageChngPwd = '';
    }

    private _isValid(form, field): boolean {
        let isValid: boolean = false;

        if (form == 'chngPwdForm') {
            // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
            if (this.chngPwdForm.controls[field].touched == false) {
                isValid = true;
            }
            // If the field is touched and valid value, then it is considered as valid.
            else if (this.chngPwdForm.controls[field].touched == true && this.chngPwdForm.controls[field].valid == true) {
                isValid = true;
            }
        }

        return isValid;
    }

    public onValueChanged(data?: any) {
        this._errorMessageChngPwd = '';
        if (!this.chngPwdForm) { return; }
        const form = this.chngPwdForm;
        for (let field in this._formErrors) {
            // clear previous error message (if any)
            let control = form.get(field);
            if (control && control.dirty) {
                this._formErrors[field].valid = true;
                this._formErrors[field].message = '';
            }
        }
    }

    onChngPwdFormSubmit() {
        if (this.chngPwdForm.dirty && this.chngPwdForm.valid) {
            if (this.chngPwdForm.value.newPassword == this.chngPwdForm.value.retypePassword) {
                this.authenticationService.changePassword(
                    this.useremail, this.chngPwdForm.value.currentPassword, this.chngPwdForm.value.newPassword, this.chngPwdForm.value.retypePassword).subscribe(
                    result => {
                        if (result.success) {
                            this.toastrService.success('Password changed successfully!');
                            this.chngPwdModalDismiss();
                        } else {
                            this._errorMessageChngPwd = 'Trouble changing the password. Please try later.';
                        }
                    },
                    error => {
                        this._submitted = false;
                        // Validation error
                        if (error.status == 422) {
                            this._resetFormErrors();
                            // this._errorMessageChngPwd = "There was an error on submission. Please check again.";
                            let errorFields = JSON.parse(error.data.message);
                            this._setFormErrors(errorFields);
                        } else {
                            this._errorMessageChngPwd = error.data;
                        }
                    });
            } else {
                this._errorMessageChngPwd = 'Confirm password should be same as new password';
                this._submitted = false;
            }

        }
    }

    chngPwdModalDismiss() {
        this.chngPwdModal.hide();
        this._errorMessageChngPwd = '';
        this.chngPwdForm.reset();
        this._resetFormErrors();
    }
}