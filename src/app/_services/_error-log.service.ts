import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp, JwtHelper} from 'angular2-jwt';


import {ErrorLog} from "app/_models/error-log";
import {GlobalService} from './_global.service';



@Injectable()

export class ErrorLogService {

     // This is the URL to the OData end point
    private _errorLogsUrl = this._globalService.apiHost + '/error-log';

   constructor(private _globalService: GlobalService,
                private _router: Router,
                private _http: Http) {
         
    }

   public getErrorLog() :Observable<ErrorLog[]> {
        return this._http.get(
                    this._errorLogsUrl+'?sort=-id',
                    {headers:  this._globalService.getHeaders()}
             ) .map((response: Response) => <ErrorLog[]>response.json().data)
            .catch(this._globalService.handleError);
    }
}