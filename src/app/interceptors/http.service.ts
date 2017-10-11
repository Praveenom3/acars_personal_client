import { Injectable, Injector } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoaderService } from './loader.service';
import { Router } from "@angular/router";
import { AuthenticationService } from "app/_services/_authentication.service";
import { ToastrService } from "ngx-toastr";
@Injectable()
export class HttpService extends Http {

    private loader: boolean = false;
    private router;
    constructor(backend: XHRBackend,
        options: RequestOptions,
        private loaderService: LoaderService,
        private authenticationService: AuthenticationService,
        private toaterService: ToastrService) {
        super(backend, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        this.addLoader();
        return super.request(url, options)
            ._finally(() => {
                setTimeout(() => {    //<<<---    using ()=> syntax
                    this.removeLoader();
                }, 500);
            }).catch(this.catchErrors());
    }

    /**
     * 
     */
    private catchErrors() {

        return (res: Response) => {

            if (res.status === 401) {
                this.toaterService.error('Un Authorized User Accessd');
                this.authenticationService.logoutUser();
            }
            return Observable.throw(res);
        };
    }
    /**
     * 
     */
    public removeLoader() {
        this.loaderService.hideLoader();
        this.loader = false
    }
    /**
     * 
     */
    public addLoader() {
        if (!this.loader) {
            this.loaderService.showLoader();
            this.loader = true;
        }
    }
}
