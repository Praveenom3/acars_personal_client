import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

import { Lookup } from "app/_models/lookup";
import { GlobalService } from './_global.service';

@Injectable()

export class LookupOptionsService {

    private _lookupURL = this._globalService.apiHost + '/lookup-options';

    constructor(private _globalService: GlobalService,
        private _router: Router,
        private _http: Http) {

    }

    public addLookupName(Data: Lookup): Observable<any> {
        return this._http.post(
            this._lookupURL + '/create-lookup-name',
            Data,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public addLookupOption(Data: Lookup): Observable<any> {
        return this._http.post(
            this._lookupURL + '/create-lookup-option',
            Data,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public updateLookupOption(lookupData: Lookup): Observable<any> {
        console.log(lookupData);
        return this._http.put(
            this._lookupURL + '/' + lookupData.lookup_option_id,
            lookupData,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public deleteLookupOption(lookupData): Observable<void> {
        return this._http.delete(
            this._lookupURL + '/' + lookupData.lookup_option_id,
            { headers: this._globalService.getHeaders() }
        ).catch(this._globalService.handleError);
    }

    public getLookupNames(): Observable<Lookup[]> {
        return this._http.get(
            this._lookupURL + '/get-lookup-names',
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => <Lookup[]>response.json().data)
            .catch(this._globalService.handleError);
    }

    public getLookupData(): Observable<Lookup[]> {
        return this._http.get(
            this._lookupURL,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => <Lookup[]>response.json().data)
            .catch(this._globalService.handleError);
    }

    public updateLookupStatus(lookupData): Observable<any> {
        return this._http.put(
            this._lookupURL + '/update-status/' + lookupData.lookup_option_id,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }


    public getLookupOptions(lookup_master_id): Observable<Lookup[]> {
        return this._http.get(
            this._lookupURL + '/get-lookup-options/'+lookup_master_id,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => <Lookup[]>response.json().data)
            .catch(this._globalService.handleError);
    }

}
