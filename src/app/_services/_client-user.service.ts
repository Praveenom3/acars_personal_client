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
import { HttpService } from 'app/interceptors/http.service';

@Injectable()

export class ClientUserService {

    // This is the URL to the OData end point
    private _apiUrl = this._globalService.apiHost + '/client-user';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: HttpService) {

    }
    /**
     * Updating client company information
     * 
     * @param company 
     */
    public updateClientCompanyInfo(company): Observable<any> {
        return this._http.post(
            this._apiUrl + '/update-company-info', company,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json())
            .catch(this._globalService.handleError);
    }
    /**
     * 
     * @param company 
     */
    public updateClientPurchaseInfo(company, field): Observable<any> {
        let data = JSON.stringify({
            'field': field,
            'data': company
        });
        return this._http.post(
            this._apiUrl + '/update-client-purchase-information', data,
            {
                headers: this._globalService.getHeaders()
            }).map(response => response.json())
            .catch(this._globalService.handleError);
    }
    
    public getClientProfile(user_id): Observable<any> {
        return this._http.get(
            this._apiUrl + '/get-user-data/' + user_id,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public updateClientProfile(formValues): Observable<any> {
        return this._http.put(
            this._apiUrl + '/update-client-profile/' + formValues.user_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

}


