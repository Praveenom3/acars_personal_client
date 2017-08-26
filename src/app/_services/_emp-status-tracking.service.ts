import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

import { GlobalService } from './_global.service';
import { EmpStatusTracking } from "app/_models/emp-status-tracking";

@Injectable()

export class EmpStatusTrackingService {

    private _empStatusUrl = this._globalService.apiHost + '/emp-status-tracking';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {

    }

    public addEmpStatusTracking(formValues: EmpStatusTracking): Observable<any> {
        return this._http.post(
            this._empStatusUrl,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }


    public getEmpStatusTrackingData(companyId): Observable<any> {
        return this._http.get(
            this._empStatusUrl + '/get-emp-status-data/' + companyId,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public updateEmpStatusTracking(formValues: EmpStatusTracking): Observable<any> {
        return this._http.put(
            this._empStatusUrl + '/' + formValues.emp_status_track_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
}
