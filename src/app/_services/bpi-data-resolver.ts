import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ElementMasterService } from "app/_services/_element-master.service";
import { GlobalService } from "app/_services/_global.service";
import { GeneralPlanInfoService } from "app/_services/_general-plan-info.service";
import { MecCoverageService } from "app/_services/_mec-coverage.service";

@Injectable()
export class BpiDataDataResolver implements Resolve<any> {
    company_id: any;
    product_id: any;

    constructor(private elementMasterService: ElementMasterService,
        private globalService: GlobalService,
        private _mecService: MecCoverageService,
        private _generalPlanInfoService: GeneralPlanInfoService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.product_id = this.globalService.decode(route.params['product']);
        this.company_id = this.globalService.decode(route.params['company']);

        if (state.url.indexOf('/mec-coverage') !== -1) {
            return this._mecService.getMecCoverageData(this.company_id);
        } else if (state.url.indexOf('/benefit-plan-info') !== -1) {
            return this._generalPlanInfoService.getGeneralPlanInfoData(this.company_id);
        }

    }

}