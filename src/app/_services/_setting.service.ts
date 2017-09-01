import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

import { Setting } from "app/_models/setting";
import { GlobalService } from './_global.service';


@Injectable()

/**
 * Settings Service
 */
export class SettingsService {

    public irsField = 3;
    public field1095 = 2;
    public settings: any;
    public irsDays: any;
    public employees1095Days: any;

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
    public getSettings(): Observable<Setting[]> {
        return this._http.get(
            this._settingsUrl,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => <Setting[]>response.json().data)
            .catch(this._globalService.handleError);
    }
    /**
     * 
     * @param setting 
     */
    public saveSettings(setting: Setting) {
        return this._http.put(
            this._settingsUrl + '/' + setting.setting_id,
            setting,
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
    /**
     * 
     */
    public setSettingsValue() {

        let settingValue: any;
        if (!this.settings) {
            this.getSettings().subscribe((settings) => {
                this.settings = settings;
                if (this.settings) {
                    this.settings.forEach(element => {
                        switch (element.setting_id) {
                            case this.irsField:
                                this.irsDays = this.getDays(element.setting_value);
                                break;
                            case this.field1095:
                                this.employees1095Days = this.getDays(element.setting_value);
                                break;
                        }
                    });
                }
            },
            );
        }
    }
    /**
     * 
     * @param date 
     */
    public getDays(date) {
        var date2 = new Date();
        var date1 = new Date(date);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
}
