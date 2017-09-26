import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class LoaderService {

    
    loaderState: boolean = false;

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
