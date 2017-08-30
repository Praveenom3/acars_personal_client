import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {GlobalService} from './_global.service';

@Injectable()
export class PlanClassesService {
    private _planClassUrl = this._globalService.apiHost + '/plan-classes';

    constructor(
        private _globalService: GlobalService,
        private _http: Http) {
    }

    /**
     *  Begin Coverage Type Services
     */
    public getPlanClasses() :Observable<any> {
        return this._http.get(
                    this._planClassUrl+'?sort=-plan_class_id',
                    {headers:  this._globalService.getHeaders()}
                ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }
    
    public getMaxPlanClassNumber() :Observable<any> {
        return this._http.get(
                    this._planClassUrl+'/get-max-plan-class-number',
                    {headers:  this._globalService.getHeaders()}
                ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public getPlanClass(id) :Observable<any> {
        return this._http.get(
                    this._planClassUrl+'/'+id,
                    {headers:  this._globalService.getHeaders()}
                ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public createCoverageType(data) :Observable<any> {
        return this._http.post(
                    this._planClassUrl,
                    data,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public updateCoverageType(data) :Observable<any> {        
        let url = this._planClassUrl+'/'+data.plan_class_id;
        return this._http.put(
                    url,
                    data,
                    {headers: this._globalService.getHeaders()}
                ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    /**
     *  Begin Coverage Offered Services
     */
    public getCoverageOffered(id) :Observable<any> {
        return this._http.get(
                    this._planClassUrl+'/get-coverage-offered/'+id,
                    {headers:  this._globalService.getHeaders()}
                ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public createOrUpdateCoverageOffered(id, data) :Observable<any> {
        return this._http.put(
                    this._planClassUrl+'/create-or-update-coverage-offered/'+id,
                    data,
                    {headers:  this._globalService.getHeaders()}
                ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }
    
    /**
     *  Begin Employee Contribution Services
     */
    public getEmployeeContribution(id) :Observable<any> {
        return this._http.get(
                    this._planClassUrl+'/get-employee-contribution/'+id,
                    {headers:  this._globalService.getHeaders()}
                ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }
    
    public createOrUpdateEmployeeContribution(id, data) :Observable<any> {
        return this._http.put(
                    this._planClassUrl+'/create-or-update-employee-contribution/'+id,
                    data,
                    {headers:  this._globalService.getHeaders()}
                ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

}
