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
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

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
        private toasterService: ToastrService,
        private router: Router,
        private _anythingElseService: AnythingElseService) { }
    /**
     * 
     * @param route ActivatedRoute
     * @param state RouterStateSnapshot
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        this.product_id = this.globalService.decode(route.params['product']);
        this.company_id = this.globalService.decode(route.params['company']);

        this.validateSessionDataAndUrl();

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
    /**
     * 
     */
    private validateSessionDataAndUrl() {
        let sessionCompanyData = JSON.parse(this.globalService.getCompany());
        let sessionCompanyId = this.globalService.decode(sessionCompanyData.company_id);
        let sessionProductId = this.globalService.decode(sessionCompanyData.product_id);
        let sessionClientId = this.globalService.decode(sessionCompanyData.client_id);
        if (!sessionCompanyData.primary_data) {
            this.toasterService.error("Please fill primary data");
            this.redirectToDashboard(sessionProductId, sessionClientId);
        }
        if (!sessionCompanyData.onBoarding_data) {
            this.toasterService.error("Please complete on boarding step");
            this.redirectToDashboard(sessionProductId, sessionClientId);
        }
        if (this.product_id != sessionProductId || this.company_id != sessionCompanyId) {
            this.toasterService.error("Un Authorised company user");
            this.redirectToDashboard(sessionProductId, sessionClientId);
        }
        return true;
    }
    /**
     * 
     * @param productId 
     * @param clientId 
     */
    public redirectToDashboard(productId, clientId) {
        this.router.navigate(['client/' + this.globalService.encode(productId) + '/' + this.globalService.encode(clientId) + '/dashboard']);
    }
}