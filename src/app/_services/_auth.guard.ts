import {Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, NavigationEnd } from '@angular/router';
import {AuthenticationService} from './_authentication.service';
import * as Globals from '../_shared/_globals';
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    isUrlRequiresPermission: boolean = false;
    previousUrl: string;
    constructor(
        private _authenticationService: AuthenticationService, 
        private _router:Router, 
        private toastrService: ToastrService) {
        _router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(e => {
          this.previousUrl = e.url;
        });
    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
        let url:string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string):boolean{
        this.isUrlRequiresPermission = false;

        if(this._authenticationService.isLoggedIn()) {

            for (var permission_key in Globals.route_permissions) {
                if (Globals.route_permissions.hasOwnProperty(permission_key)) {
                    var routes = Globals.route_permissions[permission_key];
                    routes.forEach(route => {
                        if(url.indexOf(route) !== -1){
                            this.isUrlRequiresPermission = true;
                            
                            if (localStorage.getItem("admin_permissions") != 'undefined') {
                                let admin_permissions = JSON.parse(localStorage.getItem('admin_permissions'));
        
                                admin_permissions.forEach(ap => {
                                    if(ap == permission_key){
                                        this.isUrlRequiresPermission = false;
                                        return true;
                                    }
                                });
                            }
                        }
                    });
                }
            }

            if(this.isUrlRequiresPermission == false){
                return true;
            }else{
                this.isUrlRequiresPermission = false;
            
                if(this.previousUrl){
                    this.toastrService.error('You do not have necessary privileges to access the page.');
                    this._router.navigate([this.previousUrl]);
                    return true;
                }
            }
        }

        // Store the attempted URL for redirecting
        this._authenticationService.redirectURL = url;
    
        // Navigate to the login page with extras
        this._router.navigate(['/login'], { queryParams: { r: url }});
        return false;
    }
}