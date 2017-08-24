import { Component, OnInit } from '@angular/core';
import { ClientDashBoardService } from "app/_services/_client-dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-contract-signor',
  templateUrl: './contract-signor.component.html',
  styleUrls: ['./contract-signor.component.css']
})
export class ContractSignorComponent implements OnInit {

  public contractSignFormErrors: any;
  public contractSignForm: FormGroup;
  public submitted = false;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(public route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public clientDashBoardService: ClientDashBoardService,
  ) {
    this.clientDashBoardService.productParams = route.snapshot.params['product'];
    this.clientDashBoardService.clientParams = route.snapshot.params['client'];
    this.clientDashBoardService.contractSignStep = true;
    this.clientDashBoardService.setInformation()

    this.contractSignForm = _formBuilder.group({
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9&.-@ ,]+$/)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9&.-@ ,]+$/)])],
      email_id: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      mobile_number: ['', Validators.compose([Validators.required])],
      phone_extension: ['', Validators.compose([])],
    });

    this.contractSignForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  ngOnInit() {
    if (!this.clientDashBoardService.contractSignorModel) {
      this.clientDashBoardService.contractSignorModel = this.clientDashBoardService.createNewModel();
    } else if (this.clientDashBoardService.contractSignorModel.first_name != null &&
      this.clientDashBoardService.contractSignorModel.first_name != '' &&
      this.clientDashBoardService.contractSignorModel.first_name
    ) {
      console.log(this.clientDashBoardService.contractSignorModel.first_name);
      this.setup();
    }

    this._resetFormErrors();
  }

  /**
   * 
   */
  private _resetFormErrors(): void {

    this.contractSignFormErrors = {
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
      this.contractSignFormErrors[key].valid = false;
      this.contractSignFormErrors[key].message = message;
    }
  }

  /**
   * 
   * @param data 
   */
  public onValueChanged(data?: any) {
    if (!this.contractSignForm) { return; }
    const form = this.contractSignForm;
    for (let field in this.contractSignFormErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        this.contractSignFormErrors[field].valid = true;
        this.contractSignFormErrors[field].message = '';
      }
    }
  }

  /**
   * 
   */
  onSubmit() {
    this.submitted = true;
    this.setup();
    this.clientDashBoardService.contractSignorModel.mobile_number = this.clientDashBoardService.contractSignorModel.mobile_number.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\ ]/gi, '');
    this.nextPrimaryContractStep(false);
  }

  public isSetup = false;
  /* add/remove form div in setup*/
  setup(): void {
    this.isSetup = true;
  }
  /**
   * 
   */
  close(): void {
    this._resetFormErrors();
    this.isSetup = false;
    this.submitted = false;
    this.contractSignForm.reset();
  }
  /**
   * 
   */
  backToBillingContract() {
    this.clientDashBoardService.contractSignStep = false;
    this.clientDashBoardService.billingStep = true;
    this.clientDashBoardService.setInformation()
  }
  /**
   * 
   * @param clientAsDefaultContractSign 
   */
  nextPrimaryContractStep(clientAsDefaultContractSign = true) {

    this.clientDashBoardService.primaryContractStep = true;
    this.clientDashBoardService.contractSignStep = false;
    this.clientDashBoardService.billingStep = false;
    this.clientDashBoardService.agreementStep = false;

    this.clientDashBoardService.clientAsDefaultContractSign = clientAsDefaultContractSign;
    if (clientAsDefaultContractSign) {
      this.close();
    }
    this.clientDashBoardService.isContractSignorSet = true;

    this.clientDashBoardService.setInformation()
  }
}
