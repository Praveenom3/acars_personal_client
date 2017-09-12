import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "app/_services/_global.service";
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { Company } from "app/_models/company";
import { ModalDirective } from "ngx-bootstrap";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ClientUserService } from "app/_services/_client-user.service";
import { ToastrService } from "ngx-toastr";
import { SettingsService } from "app/_services/_setting.service";
import { CompanyUser } from "app/_models/company-user";
import { CompanyUserService } from "app/_services/_company-user.service";

declare var $: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  @ViewChild('companyModal') public companyModal: ModalDirective;
  @ViewChild('companyUserModal') public companyUserModal: ModalDirective;
  @ViewChild('companyUploadDataFile') public companyUploadDataFile: ModalDirective;

  public modalTitle: string;
  public companyUserModalTitle: string;
  public companyEdit: Company;
  public companyUserInformation: CompanyUser;

  private _formErrors: any;
  public _companyForm: FormGroup;

  private _companyUserFormErrors: any;
  public _companyUserForm: FormGroup;
  private _companyUserErrorMessage: string;
  private _companyUserSubmitted: boolean;

  public filterQuery = "";
  public sortOrder = "asc";
  public sortBy = "";

  private _errorMessage: string;
  private _submitted: boolean;

  public userType: any;
  public mask = ['(', /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  public phoneNumberMask = ['(', /\d/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]

  constructor(public route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public router: Router,
    public globalService: GlobalService,
    public clientDashBoardService: ClientDashBoardService,
    private toastrService: ToastrService,
    public settingsService: SettingsService,
    public companyUserService: CompanyUserService,
    public clientUserService: ClientUserService) {

    this._companyForm = _formBuilder.group({
      company_name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9& ,]+$/)])],
      company_ein: ['', Validators.compose([Validators.required])],
    });

    this.createCompanyUserForm();

    this.clientDashBoardService.productParams = this.globalService.decode(route.snapshot.params['product']);
    this.clientDashBoardService.clientParams = this.globalService.decode(route.snapshot.params['client']);
    this._companyForm.valueChanges
      .subscribe(companyData => this.onValueChanged(companyData));
    this._companyUserForm.valueChanges
      .subscribe(data => this.onCompanyValueChanged(data));
    this.userType = globalService.getUserType();
  }
  /**
   * 
   */
  public createCompanyUserForm() {
    this._companyUserForm = this._formBuilder.group({
      first_name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9& -]+$/)])],
      last_name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9& -]+$/)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      phone: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      phone_extension: ['']
    });
  }
  /**
   * 
   */
  public validationMessages = {
    'company_name': {
      'required': 'Company Name is required.',
      'pattern': 'No special characters are allowed other than & ,'
    },
    'company_ein': {
      'required': 'Company EIN is required.'
    }
  };

  /**
   *  Initialiazes component
   */
  ngOnInit() {
    this.clientDashBoardService.setInformation();
    this.companyEdit = Object.assign({});
    this._resetFormErrors();
    this.clientDashBoardService.selectedCompanyRow = this.clientDashBoardService.company.company_id;
    this.setIrsData();
    this._resetCompanyUserFormErrors();
    this.companyUserInformation = Object.assign({})
  }
  /**
   * 
   */
  toggleInvoicePayment(company) {
    if (this.userType == 3 || this.userType == 4) {
      return false;
    }
    this.clientDashBoardService.company.is_invoice_paid = !this.clientDashBoardService.company.is_invoice_paid;
    this.clientUserService.updateClientPurchaseInfo(this.clientDashBoardService.company, 'is_invoice_paid').subscribe(
      result => {
        if (result.success) {
          this.toastrService.success('Company Details Updated Successfully.');
          this.clientDashBoardService.setCompanySteps();
        } else {
          this.toastrService.error('Error in updating record.');
          this._submitted = false;
        }
      },
      error => {
        this.toastrService.error(error.data);
      });
  }
  /**
   * 
   */
  toggleAgreementSign() {

    if (this.userType == 3 || this.userType == 4) {
      return false;
    }

    this.clientDashBoardService.company.client_agreement = !this.clientDashBoardService.company.client_agreement;
    this.clientUserService.updateClientPurchaseInfo(this.clientDashBoardService.company, 'client_agreement').subscribe(
      result => {
        if (result.success) {
          this.toastrService.success('Company Details Updated Successfully.');
          this.clientDashBoardService.setCompanySteps();
        } else {
          this.toastrService.error('Error in updating record.');
          this._submitted = false;
        }
      },
      error => {
        this.toastrService.error(error.data);
      });
  }
  /**
   * 
   */
  toggleDiscoveryCallStatus() {

    if (this.userType == 3 || this.userType == 4) {
      return false;
    }

    this.clientDashBoardService.company.discovery_session = !this.clientDashBoardService.company.discovery_session;
    this.clientUserService.updateClientPurchaseInfo(this.clientDashBoardService.company, 'discovery_session').subscribe(
      result => {
        if (result.success) {
          this.toastrService.success('Company Details Updated Successfully.');
          this.clientDashBoardService.setCompanySteps();
        } else {
          this.toastrService.error('Error in updating record.');
          this._submitted = false;
        }
      },
      error => {
        this.toastrService.error(error.data);
      });

  }

  /**
   * 
   * @param companyInfo 
   */
  public updateCompanyInfo(companyInfo: Company) {
    this.companyEdit = Object.assign({}, companyInfo);
    this.modalTitle = "Edit Company : " + companyInfo.company_name;
    this.companyModal.show();
  }
  /**
   * 
   * @param field 
   */
  private _isValid(field): boolean {
    let isValid: boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
    if (this._companyForm.controls[field].touched == false) {
      isValid = true;

    }
    // If the field is touched and valid value, then it is considered as valid.
    else if (this._companyForm.controls[field].touched == true && this._companyForm.controls[field].valid == true) {
      isValid = true;

    } else if (this._companyForm.controls[field].touched == true && this._companyForm.controls[field].valid == false) {
      let control = this._companyForm.get(field);
      const messages = this.validationMessages[field];

      this._formErrors[field].valid = false;
      for (const key in control.errors) {
        this._formErrors[field].message = messages[key];
      }
      isValid = false;
    }
    return isValid;
  }
  /**
   * 
   */
  onSubmit() {
    if (this.companyEdit.company_ein) {
      this.companyEdit.company_ein = this.companyEdit.company_ein.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\ ]/gi, '');
    }
    this._submitted = true;
    this.clientUserService.updateClientCompanyInfo(this.companyEdit).subscribe(
      result => {
        if (result.success) {
          this.closeModal();
          this.resetCompanyInfo(result);
          this._submitted = false;
          this.toastrService.success('Company Details Updated Successfully.');
        } else {
          this._errorMessage = 'Record not Updated';
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
  /**
   * 
   * @param result 
   */
  resetCompanyInfo(result) {
    let updatedCompany = result.data;
    let companies = this.clientDashBoardService.companies;

    companies.forEach(element => {
      if (element.company_id == updatedCompany.company_id) {
        element.company_name = updatedCompany.company_name;
        element.company_ein = updatedCompany.company_ein;
      }
      if (this.clientDashBoardService.company.company_id == updatedCompany.company_id) {
        this.clientDashBoardService.company.company_name = updatedCompany.company_name;
        this.clientDashBoardService.company.company_ein = updatedCompany.company_ein;
      }
    });
    this.clientDashBoardService.setCompanyToSession();
    this.clientDashBoardService.setCompanySteps();
  }
  /**
   * 
   */
  public closeModal() {
    this._companyForm.reset();
    this.companyModal.hide();
    this._resetFormErrors();
  }
  /**
   * 
   */
  private _resetFormErrors(): void {
    this._formErrors = {
      company_name: { valid: true, message: '' },
      company_ein: { valid: true, message: '' },
    };
  }
  /**
   * 
   * @param errorFields 
   */
  private _setFormErrors(errorFields: any): void {
    for (let key in errorFields) {
      if (!errorFields.hasOwnProperty(key)) continue;
      let message = errorFields[key];
      this._formErrors[key].valid = false;
      this._formErrors[key].message = message;
    }
  }

  /**
   * 
   * @param data 
   */
  public onValueChanged(data?: any) {
    if (!this._companyForm) { return; }
    const form = this._companyForm;
    for (let field in this._formErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        this._formErrors[field].valid = true;
        this._formErrors[field].message = '';
      }
    }
  }
  /**
   * 
   * @param company 
   */
  public setCompany(company: Company) {
    this.clientDashBoardService.splitUrl = '';
    this.clientDashBoardService.getCompanyInformation(company.company_id).subscribe(result => {
      if (result.success) {
        let productId = this.clientDashBoardService.productParams;
        let clientId = company.client_id;
        this.clientDashBoardService.setAccountManagerData(productId, clientId);
        this.clientDashBoardService.setCompany(result.data);
      }
    }, error => {
      this.toastrService.error(error.data.message);
    });
  }

  /**
   * 
   */
  public setIrsData() {
    this.settingsService.setSettingsValue();
  }
  /**
   * 
   */
  public createCompanyUser() {
    this._companyUserForm.reset();
    this.companyUserInformation = this.createCompanyUserModel();
    this.companyUserModalTitle = "Add Company User";
    this.companyUserModal.show();
  }

  /**
   * 
   * @param field 
   */
  private _isCompanyUserValid(field): boolean {
    let isValid: boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true

    if (this._companyUserForm.controls[field].touched == false) {
      isValid = true;

    }
    // If the field is touched and valid value, then it is considered as valid.
    else if (this._companyUserForm.controls[field].touched == true && this._companyUserForm.controls[field].valid == true) {
      isValid = true;

    } else if (this._companyUserForm.controls[field].touched == true && this._companyUserForm.controls[field].valid == false) {
      let control = this._companyUserForm.get(field);
      const messages = this.companyUserValidationMessages[field];

      this._companyUserFormErrors[field].valid = false;
      for (const key in control.errors) {
        this._companyUserFormErrors[field].message = messages[key];
      }
      isValid = false;
    }
    return isValid;
  }

  /**
  * 
  */
  public companyUserValidationMessages = {
    'first_name': {
      'required': 'First Name is required.',
      'pattern': 'No special characters are allowed.'
    },
    'last_name': {
      'required': 'Last Name is required.',
      'pattern': 'No special characters are allowed.'
    },
    'email': {
      'required': 'Email Address is required.',
      'pattern': 'Invalid Email Address.'
    },
    'phone': {
      'required': 'Phone is required.',
    },
    'status': {
      'required': 'Status is required.',
    },
    'phone_extension': {
    }
  }
  /**
   * 
   */
  private createCompanyUserModel() {
    // Create a new CompanyUser
    let newAdminUser: CompanyUser = {
      user_id: 0,
      status: 1,
      company_user_id: 0,
      client_id: 0,
      user_type: '',
      company_id: this.clientDashBoardService.company.company_id,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      phone_extension: '',
    }
    return newAdminUser;
  }
  /**
   * 
   */
  private _resetCompanyUserFormErrors(): void {
    this._companyUserFormErrors = {
      first_name: { valid: true, message: '' },
      last_name: { valid: true, message: '' },
      email: { valid: true, message: '' },
      phone: { valid: true, message: '' },
      phone_extension: { valid: true, message: '' },
      status: { valid: true, message: '' }
    };
  }
  /**
  * 
  * @param data 
  */
  public onCompanyValueChanged(data?: any) {
    if (!this._companyUserForm) { return; }
    const form = this._companyUserForm;
    for (let field in this._companyUserFormErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        this._companyUserFormErrors[field].valid = true;
        this._companyUserFormErrors[field].message = '';
      }
    }
  }

  /**
   * 
   */
  onCompanyUserSubmit() {
    if (this.companyUserInformation.phone) {
      this.companyUserInformation.phone = this.companyUserInformation.phone.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\ ]/gi, '');
    }
    this._companyUserSubmitted = true;

    this.companyUserService.saveCompanyUser(this.companyUserInformation).subscribe(
      result => {
        if (result.success) {
          this.closeCompanyUserModal();
          this._companyUserSubmitted = false;
          this.setCompany(this.clientDashBoardService.company);
          this.toastrService.success('Company User saved Successfully.');
        } else {
          this._errorMessage = 'Record not Updated';
          this._companyUserSubmitted = false;
        }
      },
      error => {
        this._companyUserSubmitted = false;
        if (error.status == 422) {
          this._resetCompanyUserFormErrors();
          let errorFields = JSON.parse(error.data.message);
          this._setCompanyUserFormErrors(errorFields);
        } else {
          this._errorMessage = error.data;
        }
      });
  }
  /**
   * 
   */
  public closeCompanyUserModal() {
    this.companyUserModal.hide();
    this._resetCompanyUserFormErrors();
  }
  /**
   * 
   * @param errorFields 
   */
  private _setCompanyUserFormErrors(errorFields: any): void {
    for (let key in errorFields) {
      if (!errorFields.hasOwnProperty(key)) continue;
      let message = errorFields[key];
      this._companyUserFormErrors[key].valid = false;
      this._companyUserFormErrors[key].message = message;
    }
  }
  /**
   * 
   * @param companyUserData 
   */
  public viewCompanyUser(companyUserData) {
    this.companyUserInformation = this.createCompanyUserModel();
    this._resetCompanyUserFormErrors();
    this.companyUserInformation = Object.assign({}, companyUserData);
    this._companyUserSubmitted = false;
    this.companyUserModalTitle = "Edit Company User";
    this.companyUserModal.show();
  }
  /**
   * Foramtting ein to display in company detaila page
   */
  public formatCompanyEin(ein: string = '') {
    if (!ein) {
      return '_ _-_ _ _ _ _ _ _';
    }
    let einString: string = '(' + ein.slice(0, 2) + ') ' + '-' + ein.slice(2, 9);
    return einString;
  }

  /**
   * 
   */
  public closeUploadDataModal() {
    this.companyUploadDataFile.hide();
  }
  /**
   * 
   * @param step 
   */
  public redirectToEmployeeData(step: string) {
    let today: any = new Date().getTime();
    this.settingsService.setSettingsValue();
    var uploadDate: any = new Date(this.settingsService.payrollDate).getTime();
    if (parseInt(today) >= parseInt(uploadDate)) {
      switch (step) {
        case 'payroll':
        case 'uploadfiles':
          this.router.navigate([this.clientDashBoardService.payRollDataLink])
          break;
        case 'medicalplan':
          this.router.navigate([this.clientDashBoardService.medicalPlanDataLink])
          break;
      }
    } else {
      this.companyUploadDataFile.show();
    }
  }
  /**
   * 
   * @param text 
   */
  public trimData(text: string) {
    if (text.length > 10) {
      return text.slice(0, 10) + '...';
    }
    return text;
  }
}
