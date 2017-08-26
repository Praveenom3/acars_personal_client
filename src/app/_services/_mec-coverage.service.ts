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
import { MecCoverage } from "app/_models/mec-coverage";

@Injectable()

export class MecCoverageService {

    private _mecURL = this._globalService.apiHost + '/bpi-mec-coverage';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {

    }

    public addMecCoverage(formValues: MecCoverage): Observable<any> {
        return this._http.post(
            this._mecURL,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public getMecCoverageData(companyId): Observable<any> {
        return this._http.get(
            this._mecURL + '/get-mec-coverage-data/' + companyId,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public updateMecCoverage(formValues: MecCoverage): Observable<any> {
        return this._http.put(
            this._mecURL + '/' + formValues.mec_coverage_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
}
