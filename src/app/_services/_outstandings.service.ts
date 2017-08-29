import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";

import { GlobalService } from './_global.service';

@Injectable()

export class OutstandingsService {

    // This is the URL to the OData end point
    private _oustandingUrl = this._globalService.apiHost + '/outstandings';

    constructor(private _globalService: GlobalService,
        private _http: Http) {

    }

    public getOutstandingInvoices(purpose): Observable<any[]> {
        return this._http.get(
            this._oustandingUrl + '/get-outstanding-invoices/' + purpose,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

}