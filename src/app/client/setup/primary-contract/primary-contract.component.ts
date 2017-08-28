import { Component, OnInit } from '@angular/core';
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { OrdersService } from "app/_services/_orders.service";
import { GlobalService } from "app/_services/_global.service";

@Component({
  selector: 'app-primary-contract',
  templateUrl: './primary-contract.component.html',
  styleUrls: ['./primary-contract.component.css']
})
export class PrimaryContractComponent implements OnInit {

  public primaryContractFormErrors: any;
  public primaryContractForm: FormGroup;
  public submitted = false;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(public route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public clientDashBoardService: ClientDashBoardService,
    private ordersService: OrdersService,
    public globalService: GlobalService,
  ) {
    this.clientDashBoardService.productParams = globalService.decode(route.snapshot.params['product']);
    this.clientDashBoardService.clientParams = globalService.decode(route.snapshot.params['client']);
    this.clientDashBoardService.primaryContractStep = true;
    this.clientDashBoardService.setInformation()

    this.primaryContractForm = _formBuilder.group({
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9&.-@ ,]+$/)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9&.-@ ,]+$/)])],
      email_id: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      mobile_number: ['', Validators.compose([Validators.required])],
      phone_extension: ['', Validators.compose([])],
    });

    this.primaryContractForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

  }

  ngOnInit() {
    if (!this.clientDashBoardService.primaryContractModel) {
      this.clientDashBoardService.primaryContractModel = this.clientDashBoardService.createNewModel();
    } else if (this.clientDashBoardService.primaryContractModel.first_name != null &&
      this.clientDashBoardService.primaryContractModel.first_name != '' &&
      this.clientDashBoardService.primaryContractModel.first_name) {
      this.setup();
    }


    this._resetFormErrors();
  }


  /**
   * 
   */
  private _resetFormErrors(): void {

    this.primaryContractFormErrors = {
      first_name: { valid: true, message: '' },
      last_name: { valid: true, message: '' },
      email_id: { valid: true, message: '' },
      mobile_number: { valid: true, message: '' },
      phone_extension: { valid: true, message: '' },
    };
  }
  /**
   * 
   * @param errorsForm 
   * @param errorFields 
   */
  private _setFormErrors(errorsForm, errorFields: any): void {
    for (let key in errorFields) {
      // skip loop if the property is from prototype
      if (!errorFields.hasOwnProperty(key)) continue;
      let message = errorFields[key];
      this.primaryContractFormErrors[key].valid = false;
      this.primaryContractFormErrors[key].message = message;
    }
  }

  /**
   * 
   * @param data 
   */
  public onValueChanged(data?: any) {
    if (!this.primaryContractForm) { return; }
    const form = this.primaryContractForm;
    for (let field in this.primaryContractFormErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        this.primaryContractFormErrors[field].valid = true;
        this.primaryContractFormErrors[field].message = '';
      }
    }
  }

  /**
   * 
   */
  onSubmit() {
    this.submitted = true;
    this.setup();
    this.clientDashBoardService.primaryContractModel.mobile_number = this.clientDashBoardService.primaryContractModel.mobile_number.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\ ]/gi, '');
    this.nextAgreementStep(false);

    /* let data = {
       "client_email": this.clientDashBoardService.primaryContractModel.email_id
     };
 
     this.ordersService.validateClientEmail(data).subscribe(
       result => {
         if (result.success) {
           this.setup();
           this.nextAgreementStep(false);
         }
       },
       error => {
         this.primaryContractFormErrors['email_id'].valid = false;
         this.primaryContractFormErrors['email_id'].message = error.data.message;
         this.submitted = false;
       });*/

  }

  public isSetup = false;
  /* add/remove form div in setup*/
  setup(): void {
    this.isSetup = true;
  }
  close(): void {
    this.isSetup = false;
  }

  backToContractSignStep() {
    this.clientDashBoardService.primaryContractStep = false;
    this.clientDashBoardService.contractSignStep = true;
    this.clientDashBoardService.setInformation()
  }

  nextAgreementStep(clientAsDefaultPrimaryContract = true) {

    this.clientDashBoardService.primaryContractStep = false;
    this.clientDashBoardService.contractSignStep = false;
    this.clientDashBoardService.billingStep = false;
    this.clientDashBoardService.agreementStep = true;

    this.clientDashBoardService.clientAsDefaultPrimaryContract = clientAsDefaultPrimaryContract;
    this.clientDashBoardService.isPrimaryContractSet = true;
    if (clientAsDefaultPrimaryContract) {
      this.close();
    }

    this.clientDashBoardService.setInformation()
  }
}
