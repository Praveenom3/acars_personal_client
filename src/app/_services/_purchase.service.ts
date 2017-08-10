import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp, JwtHelper} from 'angular2-jwt';


import { Products } from "app/_models/products";
import {GlobalService} from './_global.service';
import { Purchase } from "app/_models/purchase";


@Injectable()

/**
 * PurchaseService Service
 */
export class PurchaseService {

    private _purchaseUrl = this._globalService.apiHost + '/order';

   constructor(private _globalService: GlobalService,
                private _router: Router,
                private _http: Http) {
         
    }
  /**
   * Fetch user related purchases using service
   */
   public getUserPurchases() {
        return this._http.get(
                    this._purchaseUrl+'/get-user-purchases/26',
                    {headers:  this._globalService.getHeaders()}
             ) .map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }
}
