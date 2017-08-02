import { Component, OnInit, OnDestroy, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';

import { Router,ActivatedRoute } from "@angular/router";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ValidationService } from "app/_services/_validation.service";
import { EmailTemplatesService } from "app/_services/_email-templates.service";
import { ModalDirective } from "ngx-bootstrap";
import { EmailTemplates } from "app/_models/email-templates";
import { ToastrService } from "ngx-toastr";
import { GlobalService } from "app/_services/_global.service";
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.css']
})
export class EmailTemplatesComponent implements OnInit {

  public data: EmailTemplates[];

  public temp_email_type = '';

  public emailTemplateSelected: EmailTemplates;
  public emailTemplates: EmailTemplates[];
  
  private _emailTemplatesForm:FormGroup;
  private _formErrors:any;
  private _submitted:boolean = false;
  private _errorMessage:string = '';

  constructor(private _globalService: GlobalService,
        private _formBuilder:FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private emailTemplatesService: EmailTemplatesService,
        private toastrService: ToastrService,
        private http:Http) { 
    
        this._emailTemplatesForm = _formBuilder.group({
             email_type: ['', Validators.compose([Validators.required])],
             subject: ['', Validators.compose([Validators.required])],
             body: ['', Validators.compose([Validators.required])]
        });

        this._emailTemplatesForm.valueChanges
            .subscribe(emailTemplateData => this.onValueChanged(emailTemplateData));
  }

  editor;

  ngOnInit() {
    tinymce.init({
      selector: '#email_description',
      plugins: ['link', 'paste', 'table','textcolor','textpattern','advlist','autolink', 'autosave', 'link', 'image' ,'lists', 'charmap', 'print', 'preview', 'hr', 'anchor','pagebreak','searchreplace', 'wordcount', 'visualblocks' ,'visualchars', 'code' ,'fullscreen', 'insertdatetime' ,'media', 'nonbreaking'],
      toolbar1:'undo redo insert styleselect bold italic alignleft aligncenter alignright alignjustify',
      toolbar2:' bullist numlist outdent indent link image forecolor backcolor emoticons fontselect fontsizeselect codesample help',
      skin_url: 'assets/skins/lightgray',
      height : 300,
      forced_root_block: "",
      setup: editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
            this.emailTemplateSelected.body = editor.getContent();
        });
      },   
    });
    
    this.emailTemplatesList();
    this.emailTemplateSelected = this.createNewEmailTemplate();
    this._resetFormErrors(); 
  }

  public validationMessages = {
            'email_type': {
                'required':      'Email Type is required.'
            },
            'subject':{
                'required':      'Subject is required.',
            },
            'body':{
                'required':      'Body is required.',
            },
        };

  createNewEmailTemplate() {
        // Create a new EmailTemplate
        let newEmailTemplate: EmailTemplates = {
            template_id:0,
            email_type :'',
            subject:'',
            body:'',
            created_by:'',
            created_at:'', 
            updated_at:'',
            updated_by:''    
        }
        return newEmailTemplate;
    }

  
    /*getting EmailTemplates from service*/
    private emailTemplatesList()
    {
        this.emailTemplatesService.getEmailTemplates()
            .subscribe((emailTemplates)=>{
                this.emailTemplates = emailTemplates;
                this.data = emailTemplates;
        },
        error =>{ this._errorMessage = error.data}
      );
    }  

    /*show emailTemplates modal after initializing it*/
     public updateEmailTemplates()
     {
         this._resetFormErrors();  
        if(this.emailTemplates && this.temp_email_type!==''){
            for (var i=0; i < this.emailTemplates.length; i++) {
                if (this.emailTemplates[i].email_type === this.temp_email_type) {
                  this.emailTemplateSelected = this.emailTemplates[i];
                   if (this.emailTemplateSelected.body) {
                        tinymce.activeEditor.setContent(this.emailTemplateSelected.body, { format: 'raw' });
                    }
                }
            }
        }else{
          this.temp_email_type='';
          this.emailTemplateSelected = this.createNewEmailTemplate();
        }
         this._submitted=false;
     }

     
    /*on submit sending form data to service.It is for both add and update*/
    public onSubmit() {            
            this._submitted = true;
            
            if(this.emailTemplateSelected.template_id > 0 ){
                this.emailTemplatesService.updateEmailTemplate(this.emailTemplateSelected).subscribe(            
                    result => { 
                        if(result.success) {
                              this._emailTemplatesForm.reset(); 
                              this._emailTemplatesForm.controls.email_type.setValue('');
                            this._resetFormErrors();
                              this.emailTemplatesList();
                              this.toastrService.success('Email template Updated Successfully.');
                                 
                        } else {
                            this._errorMessage = 'Record not Updated';
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

    
     private _resetFormErrors():void{
            this._formErrors = {
                email_type: {valid: true, message: ''},
                subject: {valid: true, message: ''},
                body: {valid: true, message: ''},
            };
            this._errorMessage = '';
            //var tinyInstance = tinymce.get('#email_description');
            if (this.emailTemplateSelected.body) {
                tinymce.activeEditor.setContent('', { format: 'raw' });
            }
            
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

        private _isValid(field):boolean {
            let isValid:boolean = false;

            if(field=='body'){
                if (tinymce.activeEditor && tinymce.activeEditor.isDirty() && this.emailTemplateSelected.body == ''){
                    let control = this._emailTemplatesForm.get(field);

                  const messages = this.validationMessages[field];
                    
                        this._formErrors[field].valid = false;
                     for (const key in control.errors) {                        
                         this._formErrors[field].message=  messages[key];
                     }
                    isValid = false;
                    this._formErrors.body.message = 'Email body is required';      
                 }else{
                      isValid = true;
                      this._formErrors.body.message = '';  
                 }
            } else if(this._emailTemplatesForm.controls[field].touched == false) {// If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
                  isValid = true;
              }
              // If the field is touched and valid value, then it is considered as valid.
              else if(this._emailTemplatesForm.controls[field].touched == true && this._emailTemplatesForm.controls[field].valid == true) {
                  isValid = true;
              }
            
            return isValid;
        }

        public onValueChanged(data?: any) {  
            
            if (!this._emailTemplatesForm) { return; }
            const form = this._emailTemplatesForm;
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
