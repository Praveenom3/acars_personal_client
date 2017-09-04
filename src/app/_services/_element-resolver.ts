import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ElementMasterService } from "app/_services/_element-master.service";
import { GlobalService } from "app/_services/_global.service";

@Injectable()
export class ElementMasterResolver implements Resolve<any> {
  
    product_id: any;

    constructor(private elementMasterService: ElementMasterService,private globalService:GlobalService) {}
    resolve (route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
        this.product_id = this.globalService.decode(route.params['product']);
            let sectionId;
      
            if(state.url.indexOf('/emp-status-tracking') !== -1){
                  sectionId = 2;
             }else if(state.url.indexOf('/plan-offering-criteria') !== -1){
                  sectionId = 3;
             }else if(state.url.indexOf('/designated-govt-entity') !== -1){
                 sectionId = 4;
             }else if(state.url.indexOf('/aggregated-group') !== -1){
                    sectionId = 5;
             }else if(state.url.indexOf('/anything-else') !== -1){
                   sectionId = 6;
             }else if(state.url.indexOf('/basic-reporting-info') !== -1){
                sectionId = 1;
             }
      
        return this.elementMasterService.getLabels(sectionId,this.product_id);
    }
}