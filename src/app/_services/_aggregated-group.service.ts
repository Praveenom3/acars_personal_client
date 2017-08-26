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
import { AggregatedGroup } from "app/_models/aggregated-group";

@Injectable()

export class AggregatedGroupService {

    private _aggregatedGroupUrl = this._globalService.apiHost + '/bri-aggregated-group';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {

    }

    public addAggregatedGroup(formValues: AggregatedGroup): Observable<any> {
        return this._http.post(
            this._aggregatedGroupUrl,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public getAggregatedGroupData(companyId): Observable<any> {
        return this._http.get(
            this._aggregatedGroupUrl + '/get-aggregated-group-data/' + companyId,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }
    
    public updateAggregatedGroup(formValues: AggregatedGroup): Observable<any> {
        return this._http.put(
            this._aggregatedGroupUrl + '/update-aggregated-data/' + formValues.aggregated_group_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
}
