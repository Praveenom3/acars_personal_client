import {
    Component, OnInit, OnDestroy, Input, Output,
    ViewContainerRef, EventEmitter, ViewChild, trigger, AfterViewInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from "app/_services/_global.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Http } from "@angular/http";
import { ModalDirective } from "ngx-bootstrap";
import { AdminUserService } from "app/_services/_admin-user.service";
import { AdminUser } from "app/_models/admin-user";

@Component({
    selector: 'app-dashboard',
    templateUrl: './admin-users.component.html',
})

export class AdminUsersComponent implements OnInit {

    data: AdminUser[];
    etype: AdminUser;

    ids: any;
    results: any;
    
    public filterQuery = "";
    public rowsOnPage = 5;
    public sortOrder = "";
    public sortBy = "";

    public permissionArray: FormArray;

    public adminUsers: AdminUser[];
    // public adminUsers : any[];
    public adminUserSelected: AdminUser;
    public PermissionsSet: any;
    private _formErrors: any;
    private _errorMessage: string;
    private modalTitle: string;
    private _submitted: boolean;
    public _adminUserForm: FormGroup;
    public checkbox: any;
    public demoChk = [];
    public serverChk = [];

    @ViewChild('AdminUsersModal') public AdminUsersModal: ModalDirective;
    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

    constructor(private _globalService: GlobalService,
        private _formBuilder: FormBuilder,
        private adminUserService: AdminUserService,
        private toastrService: ToastrService,
        private _http: Http) {
        this._adminUserForm = _formBuilder.group({
            first_name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9& -]+$/)])],
            last_name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9& -]+$/)])],
            is_active: ['', Validators.compose([Validators.required])],
            username: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
            mobile: ['', Validators.compose([Validators.required])],
            phone_extension: ['', Validators.compose([Validators.required])]
        });

        this._adminUserForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }


    /*calls when page on load*/
    ngOnInit() {
        this.getAdminUsers();
        this.adminUserSelected = this.createNewAdminUser();
        this._resetFormErrors();
    }

    private createNewAdminUser() {
        // Create a new AdminUser
        let newAdminUser: AdminUser = {
            user_id: 0,
            admin_user_id: 0,
            first_name: '',
            last_name: '',
            is_active: null,
            username: '',
            mobile: '',
            phone_extension: '',
            permissions: [],

        }
        return newAdminUser;

    }

    // Calls when the add Admin User buton is pressed
    newAdminUser() {
        this.serverChk = [];
        this._adminUserForm.reset();
        this._resetFormErrors();
        this.adminUserSelected = this.createNewAdminUser();   // Set adminUserSelected to a new Product      
        this._submitted = false;
        this.modalTitle = "Add Admin User";
        this.AdminUsersModal.show();       // Open the Popup
    }


    private getAdminUsers() {
        this.adminUserService.getAdminUsers()
            .subscribe((adminUsers) => {
                this.adminUsers = adminUsers.users;
                this.PermissionsSet = adminUsers.permissionsList;
            },
            error => { this._errorMessage = error.data }
            );
    }


    updateChecked2(value, event) {
        if (event.target.checked) {
            if (!(this.serverChk.indexOf(value) > -1)) {
                this.serverChk.push(value);
            }
        }
        else if (!event.target.checked) {
            if (this.serverChk.indexOf(value) > -1) {
                let index = this.serverChk.indexOf(value);
                this.serverChk.splice(index, 1);
            }
        }
        let mappingObject = {};

        for (let message of this.serverChk) {
            mappingObject[message] = true;
        }
        this.adminUserSelected.permissions = mappingObject;
    }

    /*updating product*/
    public updateAdminUser(adminuser: AdminUser) {
        this.adminUserSelected = this.createNewAdminUser();
        this._adminUserForm.reset();
        this._resetFormErrors();
        this.serverChk = [];
        console.log(this.serverChk);
        this.adminUserSelected.permissions = [];
        this.serverChk = adminuser.permissions;
        let mappingObject = {};
        for (let message of adminuser.permissions) {
            mappingObject[message] = true;
        }
        this.adminUserSelected = Object.assign({}, adminuser);
        let userPermissionSet = Object.assign({}, adminuser.permissions);
        this.adminUserSelected.permissions = Object.assign({}, userPermissionSet);
        this.adminUserSelected.permissions = mappingObject;
        this._submitted = false;
        this.modalTitle = "Edit Admin User";
        this.AdminUsersModal.show();

    }


    /*To delete a particular Admin User*/
    public deleteAdminUser(adminUser) {
        if (confirm("Are you sure want to delete this User?")) {
            this.adminUserService.deleteAdminUser(adminUser.admin_user_id)
                .subscribe(() => {
                    this.getAdminUsers();
                    this.toastrService.success('Admin User Deleted Succesfully .');
                },
                error => {
                    this._errorMessage = error.data;
                });
        }
    }

    public statusChange(adminUser) {
        this.adminUserService.statusChange(adminUser).subscribe(
            result => {
                if (result.success) {
                    this.getAdminUsers();
                    this.toastrService.success('Status Updated Succesfully.');
                } else {
                    this._errorMessage = 'Status not Updated.';
                }
            },
            error => {
                this._errorMessage = error.data;
            });
    }

    public closeModal() {
        this._adminUserForm.reset();
        this._resetFormErrors();
        this.AdminUsersModal.hide();
    }

    /*on submit sending form data to service.It is for both add and update*/
    public onSubmit() {
        this._submitted = true;
        if (this.adminUserSelected.admin_user_id > 0) {
            this.adminUserSelected.permissions = this.serverChk;

            this.adminUserService.updateAdminUser(this.adminUserSelected).subscribe(
                result => {
                    if (result.success) {
                        this.getAdminUsers();
                        this.closeModal();
                        this.toastrService.success('Admin User Updated Successfully.');
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
            this.adminUserSelected.permissions = this.serverChk;
            // console.log(this.permissionArray);
            this.adminUserService.addAdminUser(this.adminUserSelected).subscribe(
                result => {
                    if (result.success) {
                        this.getAdminUsers();
                        this.closeModal();
                        this.toastrService.success('Admin User Added Succesfully.');
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


    public validationMessages = {
        'first_name': {
            'required': 'First Name is required.',
            'pattern': 'No special characters are allowed.'
        },
        'last_name': {
            'required': 'Last Name is required.',
            'pattern': 'No special characters are allowed.'
        },
        'username': {
            'required': 'Email Address is required.',
            'pattern': 'Invalid Email Address.'
        },
        'is_active': {
            'required': 'Status is required.',
        },
        'mobile': {
            'required': 'phone is required.',
        },
        'phone_extension': {
            'required': 'Extension is required.',
        }
    };


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
        if (this._adminUserForm.controls[field].touched == false) {
            isValid = true;

        }
        // If the field is touched and valid value, then it is considered as valid.
        else if (this._adminUserForm.controls[field].touched == true && this._adminUserForm.controls[field].valid == true) {
            isValid = true;

        } else if (this._adminUserForm.controls[field].touched == true && this._adminUserForm.controls[field].valid == false) {
            let control = this._adminUserForm.get(field);
            const messages = this.validationMessages[field];

            this._formErrors[field].valid = false;
            for (const key in control.errors) {
                this._formErrors[field].message = messages[key];
            }
            isValid = false;
        }
        return isValid;
    }

    private _resetFormErrors(): void {
        this._formErrors = {
            first_name: { valid: true, message: '' },
            last_name: { valid: true, message: '' },
            is_active: { valid: true, message: '' },
            username: { valid: true, message: '' },
            mobile: { valid: true, message: '' },
            phone_extension: { valid: true, message: '' }
        };
    }

    public onValueChanged(data?: any) {
        if (!this._adminUserForm) { return; }
        const form = this._adminUserForm;
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