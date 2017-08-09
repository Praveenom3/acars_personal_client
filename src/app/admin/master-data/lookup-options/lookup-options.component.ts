import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from "app/_services/_global.service";
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Http } from "@angular/http";
import { ModalDirective } from "ngx-bootstrap";
import { Lookup } from "app/_models/lookup";
import { LookupOptionsService } from "app/_services/_lookup-options.service";

@Component({
  selector: 'app-master-data',
  templateUrl: './lookup-options.component.html',
  styleUrls: ['./lookup-options.component.css']
})
export class LookupOptionsComponent implements OnInit {

  tempLookupNameGroup: FormGroup;
  addLookupNameBtnActive: boolean;
  lookupOptions: Lookup[];
  _submitted: boolean;
  lookupNames: Lookup[];
  _errorMessage: any;
  _formErrors: any;
  _lookupNameForm: FormGroup;

  @ViewChild('LookUpModal') public LookUpModal: ModalDirective;

  public dropdownActive = true;
  public textboxActive = false;

  public lookupSelected: Lookup;
  public lookups: Lookup[];

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortOrder = "";
  public sortBy = "";

  public modalTitle = "Add Lookup Option";

  constructor(private _globalService: GlobalService,
    private _formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private lookupService: LookupOptionsService,
    private _http: Http) {
    this._lookupNameForm = _formBuilder.group({
      lookup_name: ['', Validators.compose([Validators.required])],
      lookup_option: ['', Validators.compose([Validators.required,Validators.maxLength(34),Validators.pattern(/^[a-zA-Z0-9& -]+$/)])]
    });

    this._lookupNameForm.valueChanges
      .subscribe(productData => this.onValueChanged(productData));

    this.tempLookupNameGroup = new FormGroup({
      lookup_name: new FormControl('', Validators.required)
    });

  }


  ngOnInit() {
    this.lookupSelected = this.createNewLookupName();
    this._resetFormErrors();
    //console.log(this._lookupNameForm);
    this.getLookupNames();
    this.getLookupData();
  }


  createNewLookupName() {
    let newLookup: Lookup = {
      lookup_master_id: 0,
      lookup_name: null,
      lookup_option_id: 0,
      lookup_option: '',
      status: ''
    }
    return newLookup;
  }

  private getLookupNames() {
    this.lookupService.getLookupNames()
      .subscribe((lookup) => {
        this.lookupNames = lookup;
      },
      error => { this._errorMessage = error.data }
      );
  }

  public saveLookupName(formData) {
    this.lookupService.addLookupName(formData).subscribe(
      result => {
        if (result.success) {
          this.getLookupNames();
          this.cancelOption();
          this.toastrService.success('Lookup Name added Succesfully.');
        } else {
          this._errorMessage = 'Lookup Name not Added.';
        }
      },
      error => {
        let errorFields = JSON.parse(error.data.message);
        for (let key in errorFields) {
          // skip loop if the property is from prototype
          if (!errorFields.hasOwnProperty(key)) continue;
          let message = errorFields[key];
          this._formErrors[key].message = message;
          this.toastrService.error(message);
        }
      });
  }

  public getLookupData() {
    this.lookupService.getLookupData()
      .subscribe((lookupdata) => {
        this.lookupOptions = lookupdata;
      },
      error => { this._errorMessage = error.data }
      );
  }

  public lookupOptionStatus(opionData) {
    this.lookupService.updateLookupStatus(opionData).subscribe(
      result => {
        if (result.success) {
          this.getLookupData();
          this.toastrService.success('Lookup Option Status Succesfully.');
        } else {
          this._errorMessage = 'Lookup Option Status not Updated.';
        }
      },
      error => {
        this._errorMessage = error.data;
      });
  }

  public updateLookupOption(opionData) {
    this.dropdownActive = true;
    this.textboxActive = false;
    this.addLookupNameBtnActive = false;
    this.lookupSelected = Object.assign({}, opionData);
    this.lookupSelected.lookup_name = opionData.lookup_master_id;
    this._submitted = false;
    this.modalTitle = "Edit Lookup Option";
    this.LookUpModal.show();
  }

  public deleteLookupOption(opionData) {
    this.lookupService.deleteLookupOption(opionData).subscribe(() => {
      this.getLookupData();
      this.toastrService.success('Lookup Option Deleted Succesfully .');
    },
      error => {
        this._errorMessage = error.data;
      });
  }

  public onSubmit() {
    this._submitted = true;
    if (this.lookupSelected.lookup_option_id > 0) {
      this.lookupService.updateLookupOption(this.lookupSelected).subscribe(
        result => {
          if (result.success) {
            this.getLookupData();
            this.closeModal();
            this.toastrService.success('Lookup Option Updated Successfully.');
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

    }
    else {
      this.lookupService.addLookupOption(this.lookupSelected).subscribe(
        result => {
          if (result.success) {
            this.getLookupData();
            this.closeModal();
            this.toastrService.success('Lookup Option Added Succesfully.');
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

  private _setFormErrors(errorFields: any): void {
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
      lookup_name: { valid: true, message: '' },
      lookup_option: { valid: true, message: '' }
    };

  }

  public onValueChanged(data?: any) {
    if (!this._lookupNameForm) { return; }
    const form = this._lookupNameForm;
    for (let field in this._formErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        this._formErrors[field].valid = true;
        this._formErrors[field].message = '';
      }

    }
  }

  public validationMessages = {
    'lookup_name': {
      'required': 'Lookup name is required.'
    },
    'lookup_option': {
      'required': 'Lookup Option is required.',
      'maxlength':'Maximum 34 characters are allowed.',
      'pattern':'No Special characters are allowed.'
    }
  };

  private _isValid(field): boolean {
    let isValid: boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
    if (this._lookupNameForm.controls[field].touched == false) {
      isValid = true;

    }
    // If the field is touched and valid value, then it is considered as valid.
    else if (this._lookupNameForm.controls[field].touched == true && this._lookupNameForm.controls[field].valid == true) {
      isValid = true;

    } else if (this._lookupNameForm.controls[field].touched == true && this._lookupNameForm.controls[field].valid == false) {
      let control = this._lookupNameForm.get(field);

      const messages = this.validationMessages[field];

      this._formErrors[field].valid = false;
      for (const key in control.errors) {
        this._formErrors[field].message = messages[key];
        // this._formErrors[field] += messages[key] + ' ';
      }
      isValid = false;
    }
    return isValid;
  }

  public addOption() {
    this._lookupNameForm.reset();
    this._resetFormErrors();
    this.dropdownActive = false;
    this._submitted = false;
    this.textboxActive = true;
  }

  public saveOption() {
    this.dropdownActive = true;
    this.textboxActive = false;
  }

  public cancelOption() {
    this.tempLookupNameGroup.reset();
    this.dropdownActive = true;
    this.textboxActive = false;
  }

  public closeModal() {
    this._lookupNameForm.reset();
    this._resetFormErrors();
    this.LookUpModal.hide();
  }

  public OpenModal() {
    this.cancelOption();
    this.tempLookupNameGroup.reset();
    this.lookupSelected = this.createNewLookupName();
    this.addLookupNameBtnActive = true;
    this.LookUpModal.show();
  }

}
