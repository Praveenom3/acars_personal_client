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
import { AnythingElse } from "app/_models/anything-else";
import { HttpService } from "app/interceptors/http.service";
@Injectable()

export class AnythingElseService {

    private _anythingUrl = this._globalService.apiHost + '/bri-anything-else';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: HttpService) {

    }

    public addAnythingElse(formValues: AnythingElse): Observable<any> {
        return this._http.post(
            this._anythingUrl,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }


    public getAnythingElseData(company): Observable<any> {
        return this._http.get(
            this._anythingUrl + '/get-anything-data-by-company/' + company,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public updateAnythingElse(formValues: AnythingElse):Observable<any>{
        return this._http.put(
            this._anythingUrl + '/' + formValues.additional_details_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
}
