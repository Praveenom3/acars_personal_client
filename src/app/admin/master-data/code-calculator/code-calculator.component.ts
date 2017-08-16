import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";
import { Code } from "app/_models/code";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GlobalService } from "app/_services/_global.service";
import { ToastrService } from "ngx-toastr";
import { Http } from "@angular/http";
import { CodeCalculatorService } from "app/_services/_code-calculator.service";
import { LookupOptionsService } from "app/_services/_lookup-options.service";

@Component({
  selector: 'app-code-calculator',
  templateUrl: './code-calculator.component.html',
  styleUrls: ['./code-calculator.component.css']
})
export class CodeCalculatorComponent implements OnInit {
  lookup_options: any;

  @ViewChild('CodeModal') public CodeModal: ModalDirective;

  public filterQuery = "";
  public rowsOnPage = 5;
  public sortOrder = "";
  public sortBy = "";

  public codeSelected: Code;
  public codes: Code[];

  private _formErrors: any;
  private _errorMessage: string;
  private modalTitle: string;
  private _submitted: boolean;

  public base64textString: string;

  public _codeForm: FormGroup;
  public line14Options: any;
  public line16Options: any;

  constructor(private _globalService: GlobalService,
    private _formBuilder: FormBuilder,
    private codeService: CodeCalculatorService,
    private lookupService: LookupOptionsService,
    private toastrService: ToastrService,
    private _http: Http) {
    this._codeForm = _formBuilder.group({
      line_14: ['', Validators.compose([Validators.required])],
      line_16: ['', Validators.compose([Validators.required])],
      code_combination: ['', Validators.compose([Validators.required])],
      employers_organizations: ['', Validators.compose([Validators.required])],
      individuals_families: ['', Validators.compose([Validators.required])]
    });

    this._codeForm.valueChanges
      .subscribe(codeData => this.onValueChanged(codeData));
  }

  /*calls when page on load*/
  ngOnInit() {
    this.getCodes();
    this.getLookupOptions("24");
    this.getLookupOptions("25");
    this.codeSelected = this.createNewCode();
    this._resetFormErrors();
  }

  public validationMessages = {
    'line_14': {
      'required': 'Line 14 is required.'
    },
    'line_16': {
      'required': 'Line 16 is required.'
    },
    'code_combination': {
      'required': 'Code Combination is required.'
    },
    'employers_organizations': {
      'required': 'Meaning to Employers is required.',
    },
    'individuals_families': {
      'required': 'Meaning to Individuals and Families is required.',
    }
  };

  createNewCode() {
    // Create a new code
    let newCode: Code = {
      code_id: 0,
      line_14: null,
      line_16: null,
      line_14_text: '',
      line_16_text: '',
      code_combination: '',
      employers_organizations: '',
      individuals_families: '',
      status: '',
      created_by: '',
      created_at: '',
      updated_at: '',
      updated_by: '',
      is_deleted: ''
    }
    return newCode;
  }

  // Calls when the add code buton is pressed
  newCode() {
    this._codeForm.reset();
    this._resetFormErrors();
    this.codeSelected = this.createNewCode();
    this._submitted = false;
    this.modalTitle = "Add Code";
    this.CodeModal.show();    // Open the Popup  
  }


  /*getting codes from service*/
  private getCodes() {
    this.codeService.getCodes()
      .subscribe((codes) => {
        this.codes = codes;
      },
      error => { this._errorMessage = error.data }
      );
  }

  /*getting codes from service*/
  private getLookupOptions(id) {
    return this.lookupService.getLookupOptions(id)
      .subscribe((lookup_options) => {
        this.lookup_options = lookup_options;
        if (id == "24") {
          this.line14Options = lookup_options;
        } else if (id == "25") {
          this.line16Options = lookup_options;
        }
      },
      error => { this._errorMessage = error.data }
      );
  }

  public changeStatus(code) {
    this.codeService.changeStatus(code).subscribe(
      result => {
        if (result.success) {
          this.getCodes();
          this.toastrService.success('Status Updated Succesfully.');
        } else {
          this._errorMessage = 'Status not Updated.';
        }
      },
      error => {
        this._errorMessage = error.data;
      });
  }


  /*updating code*/
  public updateCode(code: Code) {
    this._codeForm.reset();
    this._resetFormErrors();
    this.codeSelected = Object.assign({}, code);
    this._submitted = false;
    this.modalTitle = "Edit Code";
    this.CodeModal.show();
  }

  public closeModal() {
    this._codeForm.reset();
    this._resetFormErrors();
    this.CodeModal.hide();
  }

  /*on submit sending form data to service.It is for both add and update*/
  public onSubmit() {
    this._submitted = true;
    if (this.codeSelected.code_id > 0) {
      this.codeService.updateCode(this.codeSelected).subscribe(
        result => {
          if (result.success) {
            this.getCodes();
            this.closeModal();
            this.toastrService.success('Code Updated Successfully.');
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

      this.codeService.addCode(this.codeSelected).subscribe(
        result => {
          if (result.success) {
            this.getCodes();
            this.closeModal();
            this.toastrService.success('Code Added Succesfully.');
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


  private _resetFormErrors(): void {
    this._formErrors = {
      line_14: { valid: true, message: '' },
      line_16: { valid: true, message: '' },
      code_combination: { valid: true, message: '' },
      employers_organizations: { valid: true, message: '' },
      individuals_families: { valid: true, message: '' }
    };

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

  private _isValid(field): boolean {
    let isValid: boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
    if (this._codeForm.controls[field].touched == false) {
      isValid = true; 

    }
    // If the field is touched and valid value, then it is considered as valid.
    else if (this._codeForm.controls[field].touched == true && this._codeForm.controls[field].valid == true) {
      isValid = true;

    } else if (this._codeForm.controls[field].touched == true && this._codeForm.controls[field].valid == false) {
      let control = this._codeForm.get(field);
      const messages = this.validationMessages[field];

      this._formErrors[field].valid = false;
      for (const key in control.errors) {
        this._formErrors[field].message = messages[key];
      }
      isValid = false;
    }
    return isValid;
  }


  public onValueChanged(data?: any) {
    if (!this._codeForm) { return; }
    const form = this._codeForm;
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