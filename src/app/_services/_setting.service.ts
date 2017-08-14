import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp, JwtHelper} from 'angular2-jwt';

import { Setting } from "app/_models/setting";
import {GlobalService} from './_global.service';


@Injectable()

/**
 * Settings Service
 */
export class SettingsService {

    /**
     * Settings API Url
     */
    private _settingsUrl = this._globalService.apiHost + '/setting';
    /**
     * 
     * @param _globalService  GlobalService
     * @param _router  Router
     * @param _http  Http
     */
   constructor(
                private _globalService: GlobalService,
                private _router: Router,
                private _http: Http) {
         
    }
                
    /**
     * Fetch Settings
     */
    public getSettings() : Observable<Setting[]>
    {
        return this._http.get(
                              this._settingsUrl,
                              {headers: this._globalService.getHeaders()}
                         ) .map((response: Response)=> <Setting[]>response.json().data)
                           .catch(this._globalService.handleError);
    }
    /**
     * 
     * @param setting 
     */
    public saveSettings(setting:Setting)
    {
        return this._http.put(
                    this._settingsUrl +'/'+setting.setting_id,
                    setting,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
}
