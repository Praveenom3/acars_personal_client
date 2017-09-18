import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ElementMasterService } from "app/_services/_element-master.service";
import { GlobalService } from "app/_services/_global.service";
import { BriBasicInfoService } from "app/_services/_bri-basic-info.service";
import { EmpStatusTrackingService } from "app/_services/_emp-status-tracking.service";
import { PlanOfferingCriteriaService } from "app/_services/_plan-offering-criterial.service";
import { DesignatedGovtEntityService } from "app/_services/_designated-govt-entity.service";
import { AggregatedGroupService } from "app/_services/_aggregated-group.service";
import { AnythingElseService } from "app/_services/_anything-else.service";

@Injectable()
export class EmployerInfoDataResolver implements Resolve<any> {
    company_id: any;
    product_id: any;

    constructor(private elementMasterService: ElementMasterService,
        private globalService: GlobalService,
        private _briBasicInfoService: BriBasicInfoService,
        private _empStatusTrackingService: EmpStatusTrackingService,
        private _planOfferingCriteriaService: PlanOfferingCriteriaService,
        private _designatedGovtEntity: DesignatedGovtEntityService,
        private _aggregateGroupService: AggregatedGroupService,
        private _anythingElseService: AnythingElseService) { }
    /**
     * 
     * @param route ActivatedRoute
     * @param state RouterStateSnapshot
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        this.product_id = this.globalService.decode(route.params['product']);
        this.company_id = this.globalService.decode(route.params['company']);

        if (state.url.indexOf('/emp-status-tracking') !== -1) {
            return this._empStatusTrackingService.getEmpStatusTrackingData(this.company_id);
        } else if (state.url.indexOf('/plan-offering-criteria') !== -1) {
            return this._planOfferingCriteriaService.getPlanOfferData(this.company_id);
        } else if (state.url.indexOf('/designated-govt-entity') !== -1) {
            return this._designatedGovtEntity.getDesignatedGovtEntityData(this.company_id);
        } else if (state.url.indexOf('/aggregated-group') !== -1) {
            return this._aggregateGroupService.getAggregatedGroupData(this.company_id);
        } else if (state.url.indexOf('/anything-else') !== -1) {
            return this._anythingElseService.getAnythingElseData(this.company_id);
        } else if (state.url.indexOf('/basic-reporting-info') !== -1) {
            return this._briBasicInfoService.getbasicInfoData(this.company_id);
        }
    }
}