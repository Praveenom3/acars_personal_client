import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp, JwtHelper} from 'angular2-jwt';

import {GlobalService} from './_global.service';
import { Code } from "app/_models/code";

@Injectable()

export class CodeCalculatorService {

    private _codeUrl = this._globalService.apiHost + '/manage-code';

   constructor(private _globalService: GlobalService,
                private _router: Router,
                private _http: Http) {
         
    }
  
   public addCode(formValues:Code) :Observable<any> {
        return this._http.post(
                    this._codeUrl,
                    formValues,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public updateCode(formValues:Code) :Observable<any> {
        return this._http.put(
                    this._codeUrl +'/'+formValues.code_id,
                    formValues,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }


   public getCodes() :Observable<Code[]> {
        return this._http.get(
                    this._codeUrl,
                    {headers:  this._globalService.getHeaders()}
             ) .map((response: Response) => <Code[]>response.json().data)
            .catch(this._globalService.handleError);
    }

    public changeStatus(Code) :Observable<any> {
        return this._http.put(
                    this._codeUrl + '/change-status/'+Code.code_id,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

}
