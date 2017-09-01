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

@Injectable()

export class SearchScreenService {

    // This is the URL to the OData end point
    private _apiUrl = this._globalService.apiHost + '/search/';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {
    }

    public getAdminSearchDetails(key): Observable<any> {
        return this._http.post(
            this._apiUrl + 'admin-search',
            JSON.stringify({
                "key": key
            }),
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

}