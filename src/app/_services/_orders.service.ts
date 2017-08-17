import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp, JwtHelper} from 'angular2-jwt';


// import { ClientPurchaseUser } from "app/_models/client-purchase-user";
// import { ClientPurchases } from "app/_models/client-purchases";
// import { Clients } from "app/_models/clients";

//import { Products } from "app/_models/products";
import {GlobalService} from './_global.service';



@Injectable()

export class OrdersService {

    private _orderUrl = this._globalService.apiHost + '/order';

   constructor(private _globalService: GlobalService,
                private _router: Router,
                private _http: Http) {
         
    }
  
   public getOrders() :Observable<any> {
        return this._http.get(
                    this._orderUrl+'?sort=-client_id',
                    {headers:  this._globalService.getHeaders()}
             ) .map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public createClientsAndPurchases(data) :Observable<any> {
        return this._http.post(
                    this._orderUrl,
                    data,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public updateClientAndCreateNewPurchases(data) :Observable<any> {

        let url = this._orderUrl+'/'+data.Clients.client_id;
        return this._http.put(
                    url,
                    data,
                    {headers: this._globalService.getHeaders()}
             ).map(response => response.json())
            .catch(this._globalService.handleError);
    }
    
    public validateClientEmail(data) :Observable<any> {

        let url = this._orderUrl+'/validate-client-email';
        return this._http.post(
                    url,
                    data,
                    {headers: this._globalService.getHeaders()}
                ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

}
