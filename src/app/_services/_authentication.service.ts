import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {tokenNotExpired} from 'angular2-jwt';
import {AuthHttp, JwtHelper} from 'angular2-jwt';

import {GlobalService} from './_global.service';

@Injectable()
export class AuthenticationService {

    private loggedIn = false;
    public redirectURL = '';
    public jwtHelper: JwtHelper = new JwtHelper();


   constructor(private _globalService: GlobalService,
                private _router: Router,
                private _authHttp: Http) {
          this.loggedIn = this.isLoggedIn();
    }

   public login(username, password) :Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._authHttp.post( this._globalService.apiHost + '/user/login',
                JSON.stringify({
                    "LoginForm": {
                        "username": username,
                        "password": password
                    }
                }),
                {headers: headers}
            ).map(response => response.json())
            .map((response) => {
               
                if (response.success) {
                    localStorage.setItem('authtoken', response.data.access_token);
                    localStorage.setItem('usertype', response.data.user_type);
                    this.loggedIn = true;
                } else {
                    this.removeLocalstorage();
                    this.loggedIn = false;
                }             
                return response;
            })
            .catch(this.handleError);
    }


    public logout(): void {       
        this.removeLocalstorage();
        this.loggedIn = false;
    }

    public checkAccess(url: string): boolean{
       
        let split = url.split("/", 2);
        let module = split[1];  
              
        let  usertype = localStorage.getItem('usertype');

        if(module == 'admin' &&( usertype === "1" || usertype === "2")){
              return true;
        }else if(module == 'client' &&( usertype === "3" || usertype === "4")){
                return true;
        } 
        return false;
    }

    public removeLocalstorage():void{
         localStorage.removeItem('authtoken');
         localStorage.removeItem('usertype'); 
    }
     public getToken(): any {
        return localStorage.getItem('authtoken');
    }

    private checkToken(): any {
        return !!localStorage.getItem('authtoken');
    }

    public unauthorizedAccess(error: any): void {
        this.logout();
        this._router.navigate(['/login']);
    }

    public isLoggedIn(): boolean {
        return tokenNotExpired('authtoken');
    }

    public getJWTValue(): any{
        let token = this.getToken();
        return this.jwtHelper.decodeToken(token);
    }

    private handleError(error: Response | any) {

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