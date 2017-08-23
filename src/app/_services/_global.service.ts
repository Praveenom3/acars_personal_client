import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import * as moment from "moment";
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';


@Injectable()
export class GlobalService {
    public headers: Headers;
    public apiHost: string;
    public apiRoot: string;
    public setting: any = {};
    public years = ["2016", "2017"];
    public productTypes: any[] = [
        { id: 1, service: 'Full Service' },
        { id: 2, service: 'Self Service' },
        { id: 3, service: 'Enhanced' }
    ];
   
    constructor() {
        if (environment.production == true) {
            this.apiHost = 'http://services.acadev.acareportingsoftware.com/v1';
            this.apiRoot = 'http://services.acadev.acareportingsoftware.com/';
        } else {
            this.apiHost = 'http://services.acadev.acareportingsoftware.com/v1';
            this.apiRoot = 'http://services.acadev.acareportingsoftware.com/';
        }
    }

    public getHeaders(): any {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.headers.append('Authorization', 'Bearer ' + this.getToken());
        return this.headers;
    }

    loadGlobalSettingsFromLocalStorage(): void {
        if (localStorage.getItem('backend-setting') != null) {
            this.setting = JSON.parse(localStorage.getItem('backend-setting'));
        }

    }

    public getToken(): any {
        return localStorage.getItem('authtoken');
    }

    public getUserId(): any {
        return localStorage.getItem('user_id');
    }

    public handleError(error: Response | any) {

        let errorMessage: any = {};
        // Connection error
        if (error.status == 0) {
            errorMessage = {
                success: false,
                status: 0,
                data: "Sorry, there was a connection error occurred. Please try again.",
            };
        }
        else {
            errorMessage = error.json();
        }

        return Observable.throw(errorMessage);
    }


}
