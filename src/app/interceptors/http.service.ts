import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpService extends Http {

    private loader: boolean = false;
    constructor(backend: XHRBackend, options: RequestOptions, private loaderService: LoaderService) {
        super(backend, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        this.addLoader();
        return super.request(url, options)
            ._finally(() => {
                this.removeLoader();
            });
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