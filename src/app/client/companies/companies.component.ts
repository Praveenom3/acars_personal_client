import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalService } from "app/_services/_global.service";
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { Company } from "app/_models/company";
import { ModalDirective } from "ngx-bootstrap";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ClientUserService } from "app/_services/_client-user.service";
import { ToastrService } from "ngx-toastr";

declare var $: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  @ViewChild('companyModal') public companyModal: ModalDirective;

  public modalTitle: string;
  public companyEdit: Company;
  private _formErrors: any;
  public _companyForm: FormGroup;

  public filterQuery = "";
  public sortOrder = "asc";
  public sortBy = "";

  private _errorMessage: string;
  private _submitted: boolean;

  public accountManager: string;
  public accountManagerNumber: string;
  public brandInformation: any = {};

  public mask = ['(', /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]

  constructor(public route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public router: Router,
    public globalService: GlobalService,
    public clientDashBoardService: ClientDashBoardService,
    private toastrService: ToastrService,
    public clientUserService: ClientUserService) {
    this._companyForm = _formBuilder.group({
      company_name: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9& ,]+$/)])],
      company_ein: ['', Validators.compose([Validators.required])],

    });
    this.clientDashBoardService.productParams = this.globalService.decode(route.snapshot.params['product']);
    this.clientDashBoardService.clientParams = this.globalService.decode(route.snapshot.params['client']);
    this._companyForm.valueChanges
      .subscribe(companyData => this.onValueChanged(companyData));

  }

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
    this.setContactUsData();
  }
  /**
   * 
   */
  toggleInvoicePayment(company) {
    this.clientDashBoardService.company.is_invoice_paid = !this.clientDashBoardService.company.is_invoice_paid;
    this.clientUserService.updateClientPurchaseInvoice(this.clientDashBoardService.company).subscribe(
      result => {
        if (result.success) {
          this.clientDashBoardService.setCompanyKeyParams();
          this.toastrService.success('Company Details Updated Successfully.');
        } else {
          this._errorMessage = 'Record not Updated';
          this._submitted = false;
        }
      },
      error => {

        this.clientDashBoardService.company.is_invoice_paid = !this.clientDashBoardService.company.is_invoice_paid;
        if (error.status == 422) {

        } else {
        }
      });
  }
  /**
   * 
   */
  toggleAgreementSign() {
    this.clientDashBoardService.company.client_agreement = !this.clientDashBoardService.company.client_agreement;
    this.clientDashBoardService.setCompanyKeyParams();
  }
  /**
   * 
   */
  toggleDiscoveryCallStatus() {
    this.clientDashBoardService.company.discovery_session = !this.clientDashBoardService.company.discovery_session;
    this.clientDashBoardService.setCompanyKeyParams();
  }

  /**
   * 
   * @param companyInfo 
   */
  public updateCompanyInfo(companyInfo: Company) {
    this.companyEdit = Object.assign({}, companyInfo);
    //this.companyEdit.company_ein = '';
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
    this.companyEdit.company_ein = this.companyEdit.company_ein.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\ ]/gi, '');
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
    this.clientDashBoardService.setCompany(company);
    localStorage.setItem('company', '');
    localStorage.setItem('company', JSON.stringify(company));
    this.setContactUsData();
  }

  /**
   * 
   */
  public setContactUsData() {
    let productId = this.clientDashBoardService.productParams
    let product = this.clientDashBoardService.getProductFieldFromSession(productId);
    if (product['account_manager_name'] != 'null' && product['account_manager_name'] != '') {
      this.accountManager = product['account_manager_name'];
    }
    if (product['account_manager_number'] != 'null' && product['account_manager_number'] != '') {
      this.accountManagerNumber = product['account_manager_number'];
    }
    //this.clientDashBoardService
  }
}
