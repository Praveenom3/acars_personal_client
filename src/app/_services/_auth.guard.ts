import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {AuthenticationService} from './_authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private _authenticationService: AuthenticationService, private _router:Router) {}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
        let url:string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string):boolean{

        if(this._authenticationService.isLoggedIn()) {
              return true;            
         }
        // Store the attempted URL for redirecting
        this._authenticationService.redirectURL = url;

        // Navigate to the login page with extras
        this._router.navigate(['/login'], { queryParams: { r: url }});
        return false;
    }
}