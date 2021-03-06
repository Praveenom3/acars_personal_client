import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {AuthenticationService} from './_authentication.service';

@Injectable()
export class AccessGuard implements CanActivate, CanActivateChild {
    constructor(private _authenticationService: AuthenticationService, private _router:Router) {}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
        let url:string = state.url;
        return this.checkAccess(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkAccess(url: string):boolean{

        if(this._authenticationService.isLoggedIn() == true && this._authenticationService.checkAccess(url) == true ) {
              return true;            
         }
        return false;
    }

    
}