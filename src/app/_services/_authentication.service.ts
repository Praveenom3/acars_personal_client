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
import { CookieService } from "ngx-cookie";

@Injectable()
export class AuthenticationService {

    private loggedIn = false;
    public redirectURL = '';
    public jwtHelper: JwtHelper = new JwtHelper();


   constructor(private _globalService: GlobalService,
                private _router: Router,
                private _authHttp: Http,
            private _cookieService:CookieService) {
          this.loggedIn = this.isLoggedIn();
    }

   public login(username, password, rememberMe) :Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._authHttp.post( this._globalService.apiHost + '/user/login',
                JSON.stringify({
                    "LoginForm": {
                        "username": username,
                        "password": password,
                        "rememberMe": rememberMe
                    }
                }),
                {headers: headers}
            ).map(response => response.json())
            .map((response) => {
                if (response.success) {
                    
                    localStorage.setItem('authtoken', response.data.access_token);
                    localStorage.setItem('usertype', response.data.user_type);
                    localStorage.setItem('useremail', response.data.user_email);
                    localStorage.setItem('clientsAndCompanies', JSON.stringify(response.data.clientsAndCompanies));
                    this.loggedIn = true;

                    if(rememberMe == 1){
                        const expireDays = 30; //default expiry date is 30 days from today
                        let d:Date = new Date();
                        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
                        this._cookieService.put(response.data.cookie_key, response.data.cookie_value, {expires:d.toUTCString()});
                    }

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
        if(this._cookieService.get('rememberMe')){
            this._cookieService.remove('rememberMe');            
        }
    }

    /* Function to call the rest api to change the password */
    public changePassword(username, currentPassword, newPassword, retypePassword) :Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._authHttp.post( this._globalService.apiHost + '/user/change-password',
                JSON.stringify({
                    "ChangePasswordForm": {
                        "username": username,
                        "currentPassword": currentPassword,
                        "newPassword": newPassword,
                        "retypePassword": retypePassword
                    }
                }),
                {headers: headers}
            ).map(response => response.json())
            .map((response) => {      
                return response;
            })
            .catch(this.handleError);
    }
    /* ./Function to call the rest api to change the password */

/* Function to call the rest api to change the password */
    public passwordResetRequest(username) :Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._authHttp.post( this._globalService.apiHost + '/user/password-reset-request',
                JSON.stringify({
                    "PasswordResetRequestForm": {
                        "username": username
                    }
                }),
                {headers: headers}
            ).map(response => response.json())
            .map((response) => {    
                return response;
            })
            .catch(this.handleError);
    }
    /* ./Function to call the rest api to change the password */


/* Function to call the rest api to change the password */
    public verifyPasswordResetToken(token) :Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._authHttp.post( this._globalService.apiHost + '/user/password-reset-token-verification',
                JSON.stringify({
                    "PasswordResetTokenVerificationForm": {
                        "token": token
                    }
                }),
                {headers: headers}
            ).map(response => response.json())
            .map((response) => { 
                return response;
            })
            .catch(this.handleError);
    }
    /* ./Function to call the rest api to change the password */

    /* Function to call the rest api to set the password */
    public setPassword(token, newPassword, retypePassword) :Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');

        return this._authHttp.post( this._globalService.apiHost + '/user/password-reset',
                JSON.stringify({
                    "PasswordResetForm": {
                        "token": token,
                        "newPassword": newPassword,
                        "retypePassword": retypePassword
                    }
                }),
                {headers: headers}
            ).map(response => response.json())
            .map((response) => { 
                return response;
            })
            .catch(this.handleError);
    }
    /* ./Function to call the rest api to set the password */

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
         localStorage.removeItem('clientsAndCompanies'); 
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