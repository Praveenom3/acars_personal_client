import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { GlobalService } from './_global.service';

@Injectable()

export class ElementMasterService {

    private _elementMasterUrl = this._globalService.apiHost + '/element-master';

    constructor(private _globalService: GlobalService,
        private _http: Http) {

    }

    public updateElement(ElementData): Observable<any> {
        return this._http.put(
            this._elementMasterUrl + '/' + ElementData.element_id,
            JSON.stringify({
                "element_label": ElementData.element_label
            }),
            { headers: this._globalService.getHeaders() }
        ).map(response => response.json())
            .catch(this._globalService.handleError);
    }

    public getElementData(): Observable<any> {
        return this._http.get(
            this._elementMasterUrl,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

    public getLabels(section_id,product_id): Observable<any> {
        return this._http.get(
            this._elementMasterUrl+'/get-labels/'+section_id+'/'+product_id,
            { headers: this._globalService.getHeaders() }
        ).map((response: Response) => response.json().data)
            .catch(this._globalService.handleError);
    }

}
