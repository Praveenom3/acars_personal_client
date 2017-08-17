import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

import { AdminUser } from "app/_models/admin-user";
import { GlobalService } from './_global.service';


@Injectable()

export class AdminUserService {

    // This is the URL to the OData end point
    private _apiUrl = this._globalService.apiHost + '/admin-user';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {

    }

    public addAdminUser(formValues: AdminUser): Observable<any> {
        return this._http.post(
            this._apiUrl,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public updateAdminUser(formValues: AdminUser): Observable<any> {
        return this._http.put(
            this._apiUrl + '/' + formValues.admin_user_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public updateCurrentUser(formValues: AdminUser): Observable<any> {
        return this._http.put(
            this._apiUrl + '/' + formValues.admin_user_id,
            formValues,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public deleteAdminUser(adminUserId): Observable<void> {
        return this._http.delete(
            this._apiUrl + '/' + adminUserId,
            { headers: this._globalService.getHeaders() }
        ).catch(this._globalService.handleError);
    }

    public getAdminUsers(): Observable<any> {
        return this._http.get(
            this._apiUrl,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public statusChange(adminUser): Observable<any> {
        return this._http.put(
            this._apiUrl + '/update-status/' + adminUser.user_id,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

}


