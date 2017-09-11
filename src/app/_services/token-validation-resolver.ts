import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { GlobalService } from "app/_services/_global.service";
import { AuthenticationService } from "app/_services/_authentication.service";


@Injectable()
export class TokenValidationResolver implements Resolve<any> {
    sub: any;
    _isValidToken:any = false;
    _token:string = '';

    constructor(
        private globalService: GlobalService,
        private authenticationService: AuthenticationService) {
        }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this._token = route.queryParams.token;
        let validatedData:any = '';
        validatedData = this.authenticationService.verifyPasswordResetToken(this._token);
        
        return validatedData;
    }
}