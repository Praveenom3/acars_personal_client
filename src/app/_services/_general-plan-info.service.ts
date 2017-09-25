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
import { GeneralPlanInfo } from "app/_models/general-plan-info";
import { HttpService } from "app/interceptors/http.service";

@Injectable()

export class GeneralPlanInfoService {

    private _generalPlanURL = this._globalService.apiHost + '/bpi-general-plan-info';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: HttpService) {

    }

    public addGeneralPlanInfo(formValues: GeneralPlanInfo): Observable<any> {
        return this._http.post(
            this._generalPlanURL,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }


    public getGeneralPlanInfoData(companyId): Observable<any> {
        return this._http.get(
            this._generalPlanURL + '/get-general-plan-info-data/' + companyId,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public updateGeneralPlanInfo(formValues: GeneralPlanInfo): Observable<any> {
        return this._http.put(
            this._generalPlanURL + '/update-general-plan-info-data/' + formValues.general_plan_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

}
