import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";


import { AuthenticationService } from '../_services/_authentication.service';
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html'
})
export class SetPasswordComponent implements OnInit {

  private sub: any;
  private _isValidToken: boolean = false;
  private _token: string = '';

  private setPwdForm: FormGroup;
  private _formErrors: any;
  private _submitted: boolean = false;
  private _errorMessageSetPwd: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService) {

    this.setPwdForm = this.formBuilder.group({
      'newPassword': ['', [Validators.required, Validators.minLength(6)]],
      'retypePassword': ['', Validators.required]

    });

    this.setPwdForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  ngOnInit() {
    this._resetFormErrors();

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this._token = params['token'];
      });


      this._isValidToken = this.route.snapshot.data['token_validation_data'];

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  private _setFormErrors(errorFields:any):void{
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
      newPassword: { valid: true, message: '' },
      retypePassword: { valid: true, message: '' },
    };

    this._errorMessageSetPwd = '';
  }

  private _isValid(form, field): boolean {
    let isValid: boolean = false;

    if (form == 'setPwdForm') {
      // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
      if (this.setPwdForm.controls[field].touched == false) {
        isValid = true;
      }
      // If the field is touched and valid value, then it is considered as valid.
      else if (this.setPwdForm.controls[field].touched == true && this.setPwdForm.controls[field].valid == true) {
        isValid = true;
      }
    }

    return isValid;
  }

  public onValueChanged(data?: any) {
    this._errorMessageSetPwd = '';
    if (!this.setPwdForm) { return; }
    const form = this.setPwdForm;
    for (let field in this._formErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        this._formErrors[field].valid = true;
        this._formErrors[field].message = '';
      }
    }
  }

  onSetPwdFormSubmit() {

    if (this.setPwdForm.dirty && this.setPwdForm.valid) {
      if (this.setPwdForm.value.newPassword == this.setPwdForm.value.retypePassword) {
        this.authenticationService.setPassword(
          this._token, this.setPwdForm.value.newPassword, this.setPwdForm.value.retypePassword).subscribe(
          result => {
            if (result.success) {
              this.toastrService.success('Password has been set successfully!');
              this.router.navigate(['/login']);
            } else {
              this._errorMessageSetPwd = 'Trouble setting the password. Please try later.';
            }
          },
          error => {
            this._submitted = false;
            // Validation error
            if (error.status == 422) {
              this._resetFormErrors();
              // this._errorMessageSetPwd = "There was an error on submission. Please check again.";
              let errorFields = JSON.parse(error.data.message);
              this._setFormErrors(errorFields);
            } else {
              this._errorMessageSetPwd = error.data;
            }

          });
      } else {
        this._errorMessageSetPwd = 'Confirm password should be same as new password';
        this._submitted = false;
      }

    }

  }

}