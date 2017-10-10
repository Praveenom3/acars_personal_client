import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

import { AdminUser } from "app/_models/admin-user";
import { GlobalService } from './_global.service';
import { HttpService } from "app/interceptors/http.service";

@Injectable()

export class CompanyUserService {

    // This is the URL to the OData end point
    private _apiUrl = this._globalService.apiHost + '/company-user';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: HttpService) {
    }

    /**
     * 
     * @param company 
     */
    public saveCompanyUser(data): Observable<any> {
        return this._http.post(
            this._apiUrl + '/save-company-user-information', data,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    /**
     * 
     * @param data 
     */
    public getCompanyUserCompanies(data) {
        return this._http.post(
            this._apiUrl + '/get-companies-list', data,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json())
            .catch(this._globalService.handleError);
    }
    /**
     * 
     * @param data 
     */
    public copyCompanyDetails(data) {
        return this._http.post(
            this._apiUrl + '/copy-companies-details', data,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json())
            .catch(this._globalService.handleError);
    }
}


