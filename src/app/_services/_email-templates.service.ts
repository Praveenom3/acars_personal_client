import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp, JwtHelper} from 'angular2-jwt';


import {EmailTemplates} from "app/_models/email-templates";
import {GlobalService} from './_global.service';



@Injectable()

export class EmailTemplatesService {

     // This is the URL to the OData end point
    private _emailTemplateUrl = this._globalService.apiHost + '/email-templates';

   constructor(private _globalService: GlobalService,
                private _router: Router,
                private _http: Http) {
         
    }
  
   public addEmailTemplate(formValues:EmailTemplates) :Observable<any> {
        return this._http.post(
                    this._emailTemplateUrl,
                    formValues,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public updateEmailTemplate(formValues:EmailTemplates) :Observable<any> {
        return this._http.put(
                    this._emailTemplateUrl +'/'+formValues.template_id,
                    formValues,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public deleteEmailTemplate(emailTemplateId) :Observable<void> {
        return this._http.delete(
                    this._emailTemplateUrl+'/'+emailTemplateId,
                    {headers: this._globalService.getHeaders()}
             ).catch(this._globalService.handleError);
    }

   public getEmailTemplates() :Observable<EmailTemplates[]> {
        return this._http.get(
                    this._emailTemplateUrl+'?sort=-template_id',
                    {headers:  this._globalService.getHeaders()}
             ) .map((response: Response) => <EmailTemplates[]>response.json().data)
            .catch(this._globalService.handleError);
    }

    public statusChange(EmailTemplate) :Observable<any> {
        return this._http.put(
                    this._emailTemplateUrl + '/status-change/'+EmailTemplate.template_id,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
}