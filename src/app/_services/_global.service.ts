import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import * as moment from "moment";
import { Observable } from 'rxjs/Rx';

import { environment } from '../../environments/environment';

@Injectable()
export class GlobalService {
    systemAdmin_permission: boolean = false;
    masterData_permission: boolean = false;
    financial_permission: boolean = false;
    public headers: Headers;
    public apiHost: string;
    public apiRoot: string;
    public setting: any = {};
    public emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public years = ["2016", "2017"];
    URL_STRING = '00eeaa';
    public productTypes: any[] = [
        { id: 1, service: 'Full Service' },
        { id: 2, service: 'Self Service' },
        { id: 3, service: 'Enhanced' }
    ];

    constructor() {

        if (environment.production == true) {
            this.apiHost = 'http://198.90.22.116/v1';
            this.apiRoot = 'http://198.90.22.116/';
            //this.apiHost = 'http://acars.localhost/v1';
            //this.apiRoot = 'http://acars.localhost/';
        } else {
            this.apiHost = 'http://198.90.22.116/v1';
            this.apiRoot = 'http://198.90.22.116/';
            //this.apiHost = 'http://acars.localhost/v1';
            //this.apiRoot = 'http://acars.localhost/';
        }
    }

    public getHeaders(): any {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.headers.append('Authorization', 'Bearer ' + this.getToken());
        this.headers.append('Cache-Control', 'no-cache');
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

    public getUserEmail(): any {
        return localStorage.getItem('useremail');
    }
    /**
     * Returns User type of logged in user
     */
    public getUserType(): any {
        return localStorage.getItem('usertype');
    }

    public getCompany(): any {
        return localStorage.getItem('company');
    }
    /**
     * 
     */
    public getProducts(): any {
        let products = JSON.parse(localStorage.getItem('productsAndClients'));
        return products['products'];
    }
    /**
     * 
     */
    public getBrand(): any {
        let products = JSON.parse(localStorage.getItem('productsAndClients'));
        return products['brand'];
    }

    /**
     * Encodes and returns
     * @param param 
     */
    public encode(param): any {
        return this.URL_STRING + btoa(param);
    }
    /**
     * decodes and returns
     * 
     * @param param 
     */
    public decode(param): any {
        let splittedString = param.split(this.URL_STRING);
        return atob(splittedString[1]);
    }

    public numberFilter(numString) {
        let returnNumber;
        if (numString) {
            returnNumber = numString.replace(/[^0-9]/g, '');
        }
        return returnNumber;
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
        } else if (error.status == 401) {
            console.log('You are not authorized to view this content!');
        } else {
            errorMessage = error.json();
        }

        return Observable.throw(errorMessage);
    }

    public getPermissions(): void {
        let permissionsSet: any = [];
        if (localStorage.getItem("admin_permissions") != 'undefined') {
            let admin_permissions = JSON.parse(localStorage.getItem('admin_permissions'));

            if ((admin_permissions).indexOf(1) !== -1) {
                this.financial_permission = true;
            }
            if ((admin_permissions).indexOf(2) !== -1) {
                this.masterData_permission = true;
            }
            if ((admin_permissions).indexOf(3) !== -1) {
                this.systemAdmin_permission = true;
            }

        }
    }

}
