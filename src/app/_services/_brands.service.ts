import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp, JwtHelper} from 'angular2-jwt';


import {Brands} from "app/_models/brands";
import {GlobalService} from './_global.service';



@Injectable()

export class BrandsService {

     // This is the URL to the OData end point
    private _brandUrl = this._globalService.apiHost + '/brands';

   constructor(private _globalService: GlobalService,
                private _router: Router,
                private _http: Http) {
         
    }
  
   public addBrand(formValues:Brands) :Observable<any> {
        return this._http.post(
                    this._brandUrl,
                    formValues,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public updateBrand(formValues:Brands) :Observable<any> {
        return this._http.put(
                    this._brandUrl +'/'+formValues.brand_id,
                    formValues,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public deleteBrand(brandId) :Observable<void> {
        return this._http.delete(
                    this._brandUrl+'/'+brandId,
                    {headers: this._globalService.getHeaders()}
             ).catch(this._globalService.handleError);
    }

   public getBrands() :Observable<Brands[]> {
        return this._http.get(
                    this._brandUrl+'?sort=-brand_id',
                    {headers:  this._globalService.getHeaders()}
             ) .map((response: Response) => <Brands[]>response.json().data)
            .catch(this._globalService.handleError);
    }

    public statusChange(Brand) :Observable<any> {
        return this._http.put(
                    this._brandUrl + '/status-change/'+Brand.brand_id,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

  

}