import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from "app/_services/_global.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from "@angular/forms";
import { CustomToastrService } from "app/toaster/toaster-service";
import { Http } from "@angular/http";
import { ModalDirective } from "ngx-bootstrap";
import { AdminUserService } from "app/_services/_admin-user.service";
import { AdminUser } from "app/_models/admin-user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  public permissionArr: any[];
  public user_id: any;
  public _submitted: boolean;
  public _formErrors: any;
  public _errorMessage: any;
  public PermissionsSet: any;
  public adminUsers: any;
  public currentProfile: AdminUser;
  public _currentUserForm: FormGroup;
  public model: any = {};
  public is_disabled = true;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(private _globalService: GlobalService,
    private _formBuilder: FormBuilder,
    private adminUserService: AdminUserService,
    private toastrService: CustomToastrService,
    private _http: Http) {
    this._currentUserForm = _formBuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required, Validators.minLength(14)])],
      phone_extension: ['', Validators.compose([Validators.maxLength(6)])]
    });

    this._currentUserForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  /*calls when page on load*/
  ngOnInit() {
    this._resetFormErrors();
    (this._globalService.getUserId()) ?
      this.user_id = this._globalService.getUserId()
      : this.user_id = 0;
    this.getAdminUsers();
    this.currentProfile = this.createNewAdminUser();
  }

  private createNewAdminUser() {
    let newUser: AdminUser = {
      user_id: 0,
      admin_user_id: 0,
      first_name: '',
      last_name: '',
      is_active: '',
      username: '',
      mobile: '',
      phone_extension: '',
      permissions: [],
    }
    return newUser;

  }

  private getAdminUsers() {
    this.adminUserService.getAdminUser(this.user_id)
      .subscribe((adminUsers) => {
        this.adminUsers = adminUsers.users;
        this.PermissionsSet = adminUsers.permissionsList;
        for (let user of this.adminUsers) {
            this.currentProfile = user;
            let mappingObject = {};
            for (let message of user.permissions) {
              mappingObject[message] = true;
            }
            this.permissionArr = user.permissions;
            this.currentProfile.permissions = mappingObject;
        }
      },
      error => { this._errorMessage = error.data }
      );
  }

  /*on submit sending form data to service*/
  public onSubmit() {
    if (this.currentProfile.admin_user_id > 0) {
      this.currentProfile.permissions = this.permissionArr;
      this.adminUserService.updateAdminUser(this.currentProfile).subscribe(
        result => {
          if (result.success) {
            this.getAdminUsers();
            this.toastrService.success('Profile Updated Successfully.');
          } else {
            this._errorMessage = 'Profile not Updated';
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

    }
  }


  public validationMessages = {
    'first_name': {
      'required': 'First Name is required.'
    },
    'last_name': {
      'required': 'Last Name is required.'
    },
    'mobile': {
      'required': 'phone is required.',
      'minlength': 'Phone number should be 10 digits.'
    },
    'phone_extension': {
      'required': 'Extension is required.',
      'maxlength': 'Maximum limit for Extension is 6 digits.'
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
    if (this._currentUserForm.controls[field].touched == false) {
      isValid = true;

    }
    // If the field is touched and valid value, then it is considered as valid.
    else if (this._currentUserForm.controls[field].touched == true && this._currentUserForm.controls[field].valid == true) {
      isValid = true;

    } else if (this._currentUserForm.controls[field].touched == true && this._currentUserForm.controls[field].valid == false) {
      let control = this._currentUserForm.get(field);
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
      mobile: { valid: true, message: '' },
      phone_extension: { valid: true, message: '' }
    };
  }

  public onValueChanged(data?: any) {
    if (!this._currentUserForm) { return; }
    const form = this._currentUserForm;
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
