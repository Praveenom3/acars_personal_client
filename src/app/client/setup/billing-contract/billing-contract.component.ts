import { Component, OnInit } from '@angular/core';
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { OrdersService } from "app/_services/_orders.service";
import { GlobalService } from "app/_services/_global.service";
@Component({
  selector: 'app-billing-contract',
  templateUrl: './billing-contract.component.html',
  styleUrls: ['./billing-contract.component.css']
})
export class BillingContractComponent implements OnInit {

  public _billingFormErrors: any;
  public _billingContractForm: FormGroup;
  public submitted = false;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private router: Router,
    public activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private ordersService: OrdersService,
    public globalService: GlobalService,
    public clientDashBoardService: ClientDashBoardService) {

    this.clientDashBoardService.productParams = globalService.decode(this.activatedRoute.snapshot.params['product']);
    this.clientDashBoardService.clientParams = globalService.decode(activatedRoute.snapshot.params['client']);
    this.clientDashBoardService.billingStep = true;
    this.clientDashBoardService.setInformation()

    this._billingContractForm = _formBuilder.group({
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9&.-@ ,]+$/)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9&.-@ ,]+$/)])],
      email_id: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      mobile_number: ['', Validators.compose([Validators.required])],
      phone_extension: ['', Validators.compose([])],
    });

    this._billingContractForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

  }
  ngOnInit() {

    if (!this.clientDashBoardService.billingContractModel) {
      this.clientDashBoardService.billingContractModel = this.clientDashBoardService.createNewModel();
    } else if (this.clientDashBoardService.billingContractModel.first_name != null &&
      this.clientDashBoardService.billingContractModel.first_name != '' &&
      this.clientDashBoardService.billingContractModel.first_name) {
      this.setup();
    }

    this._resetFormErrors();
  }

  /**
   * 
   */
  private _resetFormErrors(): void {

    this._billingFormErrors = {
      first_name: { valid: true, message: '' },
      last_name: { valid: true, message: '' },
      email_id: { valid: true, message: '' },
      mobile_number: { valid: true, message: '' },
      phone_extension: { valid: true, message: '' },
    };
  }

  private _setFormErrors(errorsForm, errorFields: any): void {
    for (let key in errorFields) {
      // skip loop if the property is from prototype
      if (!errorFields.hasOwnProperty(key)) continue;
      let message = errorFields[key];
      this._billingFormErrors[key].valid = false;
      this._billingFormErrors[key].message = message;
    }
  }

  /**
   * 
   * @param data 
   */
  public onValueChanged(data?: any) {
    if (!this._billingContractForm) { return; }
    const form = this._billingContractForm;
    for (let field in this._billingFormErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        this._billingFormErrors[field].valid = true;
        this._billingFormErrors[field].message = '';
      }
    }
  }
  /**
   * 
   */
  onSubmit() {
    this.submitted = true;
    this.clientDashBoardService.billingContractModel.mobile_number = this.clientDashBoardService.billingContractModel.mobile_number.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\ ]/gi, '');

    this.setup();
    this.setBillingContract(false);

    /* 
      let data = {
        "client_email": this.clientDashBoardService.billingContractModel.email_id
      };
    this.ordersService.validateClientEmail(data).subscribe(
       result => {
         if (result.success) {
           this.setup();
           this.setBillingContract(false);
         }
       },
       error => {
         this._billingFormErrors['email_id'].valid = false;
         this._billingFormErrors['email_id'].message = error.data.message;
         this.submitted = false;
       });*/
  }

  public isSetup = false;
  /* add/remove form div in setup*/
  setup(): void {
    this.isSetup = true;

  }
  close(): void {
    this._resetFormErrors();
    this.isSetup = false;
    this.submitted = false;
    this._billingContractForm.reset();
  }

  /**
   * 
   */
  setBillingContract(clientAsDefaultBilling = true) {


    this.clientDashBoardService.primaryContractStep = false;
    this.clientDashBoardService.contractSignStep = false;
    this.clientDashBoardService.billingStep = false;

    this.clientDashBoardService.contractSignStep = true;

    this.clientDashBoardService.clientAsDefaultBilling = clientAsDefaultBilling;

    if (clientAsDefaultBilling) {
      this.close();
    }
    this.clientDashBoardService.isBillingContractSet = true;
    this.clientDashBoardService.setInformation()
  }

}
