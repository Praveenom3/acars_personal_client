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
import { BriBasicInfo } from "app/_models/bri-basic-info";


@Injectable()

export class BriBasicInfoService {

    private _basicInfoUrl = this._globalService.apiHost + '/bri-basic-info';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {

    }

    public addBasicInfo(formValues: BriBasicInfo): Observable<any> {
        return this._http.post(
            this._basicInfoUrl,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }


    public getStates(): Observable<any> {
        return this._http.get(
            this._basicInfoUrl + '/get-states',
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public getbasicInfoData(companyId): Observable<any> {
        return this._http.get(
            this._basicInfoUrl + '/get-basic-info-data/'+ companyId,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public updateBriBasicInfo(formValues: BriBasicInfo):Observable<any>{
        return this._http.put(
            this._basicInfoUrl + '/' + formValues.basic_info_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
}
