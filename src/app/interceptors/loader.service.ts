import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoaderComponent } from 'app/interceptors/loader.component';
@Injectable()

export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();

    loaderState: boolean = false;//this.loaderSubject.asObservable();

    constructor( ) {
    }
    /**
     * 
     */
    showLoader() {
        this.loaderState = true;
    }
    /**
     * 
     */
    hideLoader() {
        this.loaderState = false;
    }
}
/**
 * 
 */
export interface LoaderState {
    show: boolean;
}