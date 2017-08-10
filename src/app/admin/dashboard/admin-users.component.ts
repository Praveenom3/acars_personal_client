import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from "app/_services/_global.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
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



    public adminUsers : AdminUser[];
    // public adminUsers : any[];
    public adminUserSelected : AdminUser;
    public PermissionsSet: any;


    private _formErrors: any;
    private _errorMessage: string;
    private modalTitle: string;
    private _submitted: boolean;


    public _adminUserForm: FormGroup;

 @ViewChild('AdminUsersModal') public AdminUsersModal: ModalDirective;



    constructor(private _globalService: GlobalService,
        private _formBuilder: FormBuilder,
        private adminUserService: AdminUserService,
        private toastrService: ToastrService,
        private _http: Http) {
        this._adminUserForm = _formBuilder.group({
             first_name: ['', Validators.compose([Validators.required])],
            last_name: ['', Validators.compose([Validators.required])],
            status: ['', Validators.compose([Validators.required])],
            email_address: ['', Validators.compose([Validators.required])],
            phone: ['', Validators.compose([Validators.required])],
            extension: ['', Validators.compose([Validators.required])],
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


    private createNewAdminUser(){
              // Create a new AdminUser
        let newAdminUser: AdminUser = {
            user_id:0,
            admin_user_id: 0,        
            first_name :'',
            last_name:'',
            status:'',
            email_address:'',
            phone:'',
            extension:'',
            permissions:[],
        }
        return newAdminUser;

    }



 // Calls when the add Admin User buton is pressed
    newAdminUser() {
        this.adminUserSelected = this.createNewAdminUser();   // Set adminUserSelected to a new Product      
        this._submitted = false;
        this.modalTitle = "Add Admin User";       
        this.AdminUsersModal.show();       // Open the Popup  
    }


    private getAdminUsers(){

        this.adminUserService.getAdminUsers()
            .subscribe((adminUsers) => {
             // this.adminUsers =  JSON.parse(adminUsers);
                this.adminUsers = adminUsers.users;
                //  private years = ["2016", "2017"];
                this.PermissionsSet  = adminUsers.permissionsList;
               // this.PermissionsSet  = ['Financials','Master Data'];
                 console.log(this.PermissionsSet);
              console.log(adminUsers.permissionsList);
            },
            error => { this._errorMessage = error.data }
            );
    }


  /*updating product*/
    public updateAdminUser(adminuser: AdminUser) {
        this.adminUserSelected = Object.assign({}, adminuser);     
        this._submitted = false;
        this.modalTitle = "Edit Admin User";
        this.AdminUsersModal.show();
    }
 

 /*To delete a particular Admin User*/
    public deleteAdminUser(adminUser) {
        if (confirm("Are you sure want to delete this User?")) {
            this.adminUserService.deleteAdminUser(adminUser.adminUserId)
                .subscribe(() => {
                    this.getAdminUsers();
                    this.toastrService.success('Admin User Deleted Succesfully .');
                },
                error => {
                    this._errorMessage = error.data;
                });
        }
    }

public closeModal()
{
        this._adminUserForm.reset();
        this._resetFormErrors();
        this.AdminUsersModal.hide();
}

  /*on submit sending form data to service.It is for both add and update*/
    public onSubmit() {
        this._submitted = true;
        if (this.adminUserSelected.admin_user_id > 0) {
            this.adminUserService.updateAdminUser(this.adminUserSelected).subscribe(
                result => {
                    if (result.success) {
                        this.getAdminUsers();
                        this.closeModal();
                        this.toastrService.success('Adminn User Updated Successfully.');
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




//  model: any = {};
//   ngOnInit() { $('.table').dataTable({
//             "paging":   false,
//         "searching": false,
//         "info":     false
//         });
//     }


public validationMessages = {
        'first_name': {
            'required': 'First Name is required.'
        },
        'last_name': {
            'required': 'Last Name is required.'
        },
        'email_address': {
            'required': 'Email Address is required.'
        },
        'status': {
            'required': 'Status is required.',
        },
        'phone': {
            'required': 'phone is required.',
        },
        'extension': {
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
            status: { valid: true, message: '' },
            email_address: { valid: true, message: '' },
            phone: { valid: true, message: '' },
            extension: { valid: true, message: '' },
            permissions: { valid: true, message: '' },
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