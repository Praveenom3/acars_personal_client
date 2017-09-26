import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";

import { GlobalService } from './_global.service';
import { HttpService } from 'app/interceptors/http.service';
@Injectable()

export class OutstandingsService {

    // This is the URL to the OData end point
    private _oustandingUrl = this._globalService.apiHost + '/outstandings';

    constructor(private _globalService: GlobalService,
        private _http: HttpService) {

    }

    public getOutstandingInvoices(purpose): Observable<any[]> {
        return this._http.get(
            this._oustandingUrl + '/get-outstanding-invoices/' + purpose,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public toggleStatus(data): Observable<any[]> {
        return this._http.post(
            this._oustandingUrl + '/toggle-status',
            data,
            {headers: this._globalService.getHeaders()}
     ).map(response => response.json())
    .catch(this._globalService.handleError);
    }

}