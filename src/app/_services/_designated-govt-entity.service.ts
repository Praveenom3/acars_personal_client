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
import { GovtEntity } from "app/_models/govt-entity";
import {HttpService} from "app/interceptors/http.service"
@Injectable()

export class DesignatedGovtEntityService {

    private _govtEntityUrl = this._globalService.apiHost + '/bri-designated-govt-entity';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: HttpService
    ) {

    }

    public addGovtEntity(formValues: GovtEntity): Observable<any> {
        return this._http.post(
            this._govtEntityUrl,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }


    public getDesignatedGovtEntityData(companyId): Observable<any> {
        return this._http.get(
            this._govtEntityUrl + '/get-designated-govt-entity-data/' + companyId,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public updateGovtEntity(formValues: GovtEntity): Observable<any> {
        return this._http.put(
            this._govtEntityUrl + '/' + formValues.designated_govt_entity_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

}
