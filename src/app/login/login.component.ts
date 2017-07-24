import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthenticationService } from '../_services/_authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // moduleId: module.id,
  
})
export class LoginComponent implements OnInit {

   
    loading = false;

     model: any = {};

    private _loginForm:FormGroup;
    private _formErrors:any;
    private _submitted:boolean = false;
    private _errorMessage:string = '';

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _formBuilder:FormBuilder) { 


        this._loginForm = _formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });

        this._loginForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        }

        ngOnInit() {
            this._resetFormErrors();
            this.authenticationService.logout();
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

        private _resetFormErrors():void{
            this._formErrors = {
                username: {valid: true, message: ''},
                password: {valid: true, message: ''},
            };
        }

        private _isValid(field):boolean {
            let isValid:boolean = false;

            // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
            if(this._loginForm.controls[field].touched == false) {
                isValid = true;
            }
            // If the field is touched and valid value, then it is considered as valid.
            else if(this._loginForm.controls[field].touched == true && this._loginForm.controls[field].valid == true) {
                isValid = true;
            }
            return isValid;
        }

        public onValueChanged(data?: any) {
            if (!this._loginForm) { return; }
            const form = this._loginForm;
            for (let field in this._formErrors) {
                // clear previous error message (if any)
                let control = form.get(field);
                if (control && control.dirty) {
                    this._formErrors[field].valid = true;
                    this._formErrors[field].message = '';
                }
            }
        }

    public onSubmit(elementValues: any) {
            this.loading = true;
            this._submitted = true;
            this.authenticationService.login(elementValues.username, elementValues.password).subscribe(            
                    result => { 
                        if(result.success) {
                               if(result.data.user_type == 1 || result.data.user_type == 2 ){
                                    this.router.navigate(['/admin/dashboard']);
                               }else if(result.data.user_type == 3 || result.data.user_type == 4){
                                     this.router.navigate(['/client/dashboard']);     
                               }                         
                        } else {
                            this._errorMessage = 'Incorrect Username Or Password.';
                            this._submitted = false;
                        }
                    },
                    error => {
                        this._submitted = false;                   
                        // Validation error
                        if(error.status == 422) {
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
