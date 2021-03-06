import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from "app/_services/_global.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ClientUserService } from 'app/_services/_client-user.service';
import { OrdersService } from 'app/_services/_orders.service';
import { ClientDashBoardService } from 'app/_services/_client-dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  currentProfile: { user_id: number; first_name: string; last_name: string; is_active: string; username: string; mobile: string; phone_extension: string; };

  public user_id: any;
  public _submitted: boolean;
  public _formErrors: any;
  public _errorMessage: any;
  public _currentUserForm: FormGroup;
  public model: any = {};
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(private _globalService: GlobalService,
    private _formBuilder: FormBuilder,
    private clientUserService: ClientUserService,
    public dashBoardService: ClientDashBoardService,
    private ordersService: OrdersService,
    private toastrService: ToastrService) {

    this.dashBoardService.initDashBoardVaraibles();
    dashBoardService.setBrandData();
    dashBoardService.setActiveProduct();
    let company = JSON.parse(_globalService.getCompany());
    let productId = _globalService.decode(company.product_id);
    let clientId = _globalService.decode(company.client_id);
    dashBoardService.setHomeUrl(productId, clientId);
    this._currentUserForm = _formBuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
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

    this.getClientProfile();
    this.currentProfile = this.createNewProfile();
  }

  private createNewProfile() {
    let newUser = {
      user_id: 0,
      first_name: '',
      last_name: '',
      is_active: '',
      username: '',
      mobile: '',
      phone_extension: ''
    }
    return newUser;

  }

  private getClientProfile() {
    this.clientUserService.getClientProfile(this.user_id)
      .subscribe((profile) => {
        this.currentProfile = profile;
        this.currentProfile.mobile = '(' + this.currentProfile.mobile.slice(0, 3) + ') ' + '' + this.currentProfile.mobile.slice(3, 6) + '-' + this.currentProfile.mobile.slice(6, 10);
      },
      error => { this._errorMessage = error.data }
      );
  }

  /*on submit sending form data to service*/
  public onSubmit() {
    if (this.currentProfile.user_id > 0) {

      //checking if email is valid and then submitting the details
      let data = {
        "client_email": this.currentProfile.username
      };

      this.ordersService.validateClientEmail(data).subscribe(
        result => {
          if (result.success) {

            this.currentProfile.mobile = this.currentProfile.mobile.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\ ]/gi, '');

            this.clientUserService.updateClientProfile(this.currentProfile).subscribe(
              result => {
                if (result.success) {
                  this._submitted = true;
                  localStorage.setItem('firstName', this.currentProfile.first_name);
                  localStorage.setItem('lastName', this.currentProfile.last_name);
                  this.getClientProfile();
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


          } else {
            this.toastrService.error('Trouble validating the Email. Please try later.');
            this._submitted = false;
          }
        },
        error => {
          console.log("hello");
          this._submitted = false;
          if (error.status == 422) {
            this._resetFormErrors();
            this._formErrors['username'].valid = false;
            this._formErrors['username'].message = error.data.message;
            //this._errorMessage = "Trouble updating the Client. Please try later."
            //this._setFormErrors(this._addPurchaseFormErrors, errorFields);
          } else {
            this.toastrService.error('Trouble validating the Email. Please try later.');
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
    'username': {
      'required': 'Email is required.',
      'pattern': 'Valid Email is required.',
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
      username: { valid: true, message: '' },
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
