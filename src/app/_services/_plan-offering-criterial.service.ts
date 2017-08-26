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
import { PlanOfferingCriteria } from "app/_models/plan-offering-criteria";

@Injectable()

export class PlanOfferingCriteriaService {

    private _planOfferingUrl = this._globalService.apiHost + '/bri-plan-offer-criteria';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {

    }

    public addPlanOfferingCriteria(formValues: PlanOfferingCriteria): Observable<any> {
        return this._http.post(
            this._planOfferingUrl,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public getPlanOfferData(company): Observable<any> {
        return this._http.get(
            this._planOfferingUrl + '/get-plan-offer-data/' + company,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public updatePlanOfferingCriteria(formValues: PlanOfferingCriteria): Observable<any> {
        return this._http.put(
            this._planOfferingUrl + '/' + formValues.plan_offer_criteria_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
}
