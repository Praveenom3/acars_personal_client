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

export class OldClientsSearchService {
    private _orderUrl = this._globalService.apiHost + '/old-clients-search';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {

    }


    public getClientDetails(keyword): Observable<any> {
        let url = this._orderUrl + '/search-clients';
        return this._http.post(
            url,
            JSON.stringify({
                "keyword": keyword
            }),
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json().data)
            .catch(this._globalService.handleError);
    }

}
