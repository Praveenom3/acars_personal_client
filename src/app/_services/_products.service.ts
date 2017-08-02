import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp, JwtHelper} from 'angular2-jwt';


import { Products } from "app/_models/Products";
import {GlobalService} from './_global.service';



@Injectable()

export class ProductsService {

    private _productUrl = this._globalService.apiHost + '/products';

   constructor(private _globalService: GlobalService,
                private _router: Router,
                private _http: Http) {
         
    }
  
   public addProduct(formValues:Products) :Observable<any> {
        return this._http.post(
                    this._productUrl,
                    formValues,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public updateProduct(formValues:Products) :Observable<any> {
        return this._http.put(
                    this._productUrl +'/'+formValues.product_id,
                    formValues,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public deleteProduct(ProductId) :Observable<void> {
        return this._http.delete(
                    this._productUrl+'/'+ProductId,
                    {headers: this._globalService.getHeaders()}
             ).catch(this._globalService.handleError);
    }

   public getProducts() :Observable<Products[]> {
        return this._http.get(
                    this._productUrl+'?sort=-Product_id',
                    {headers:  this._globalService.getHeaders()}
             ) .map((response: Response) => <Products[]>response.json().data)
            .catch(this._globalService.handleError);
    }

    public accountManagerStatus(Product) :Observable<any> {
        return this._http.put(
                    this._productUrl + '/requires-account-manager/'+Product.product_id,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

  

}